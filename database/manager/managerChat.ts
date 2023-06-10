import { Message,Chat, PendingList } from "../models/Chat";
// import mongoose from "mongoose";


export const createChat = async (idAccordo: string, idUtente1: string, idUtente2: string) => {
    const newChat = new Chat({ idAccordo, idUtente1, idUtente2, messaggi: [] });
    await newChat.save();
    return newChat;
}


export const getChats = async (idUtente: string) => {
    const chats = await Chat.find({ $or: [{ idUtente1: idUtente }, { idUtente2: idUtente }] });
    return chats;
}

export async function writeMessage(chatID: string, type: string, payload: string) {
    let chatDocument = await Chat.findOne({idAccordo: chatID}).exec();
    if(!chatDocument) throw new Error("chat not found");

    chatDocument.messaggi.push({type: type, payload: payload});

    await chatDocument.save().catch(e => {throw new Error(e.message)});
    return {type: type, payload: payload}; 
}

export async function getChatters(chatID: string) {
    let chatDocument = await Chat.findOne({idAccordo: chatID}).exec();
    return [chatDocument.idUtente1, chatDocument.idUtente2];
}

export const sendMessage = async (idChat: string, idMittente: string, idRicevente: string, type: string, content: string) => {
    const newMessage = new Message({ idChat, idMittente, idRicevente, type, content });
    await newMessage.save();

    const pending = PendingList.findOne({ idUtente: idRicevente }).then((pending) => {
        if (!pending) {
            const newPending = new PendingList({ idUtente: idRicevente, pending: [newMessage.id] });
            newPending.save();
        }
        else {
            pending.messaggi.push(newMessage.id);
            pending.save();
        }
    });
    
    const chat = Chat.findById(idChat).then((chat) => {
        if (!chat) {
            const newChat = new Chat({ idChat, idUtente1: idMittente, idUtente2: idRicevente, messaggi: [newMessage.id] });
            newChat.save();
        }
        else {
            chat.messaggi.push(newMessage.id);
            chat.save();
        }
    });

    return Promise.all([pending, chat]).then(() => {
        return newMessage;
    }).catch((err) => {
        console.log(err);
    });
}

export async function getChatById(chatID: string, amount: number, end: number) {
    
    /*
    end è specificato in relazione ad messaggi.length:
    se end < 0, end = messaggi.length
    se end > 0, end = messaggi.length - end
    */ 
 
    let res = await Chat.findOne({idAccordo: chatID}).exec();
    console.log("looking for chat with accordoID: ", chatID);
    console.log(res);
    if(!res) throw new Error("chat not found");

    if(end < 0) end = res.messaggi.length;
    else end = res.messaggi.length - end;

    if(end > 0 && end-amount >= 0)
        return res.messaggi.splice(end - amount, end);
    else throw new Error("cannot get that many messages");
}

export async function chatExists(idAccordo: string) {
    let chat = await Chat.findOne({idAccordo: idAccordo}).exec();
    return Object.keys(chat).length;
}

