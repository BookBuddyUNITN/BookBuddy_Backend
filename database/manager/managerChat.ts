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


