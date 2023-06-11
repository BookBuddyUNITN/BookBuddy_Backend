import { createChat, getChatById, writeMessage, getChatters, chatExists } from "../../database/manager/managerChat";
import jwt from "jsonwebtoken"
import { idFromUsername } from "../../database/manager/managerUtenti";
import { getPayload } from "../../database/manager/managerLogin";


export async function sendMessageReq(req, res) {
    try {
        const body = req.body as {type: string, payload: string, chatID: string}; 
        const token = req.header('x-access-token');
        
        if (!Object.keys(body).length) throw new Error("bad request"); 
        const decoded = getPayload(token);
        let userID = decoded.id;
        
        // check if id matches ids in the chat document
        let users = await getChatters(body.chatID); 
        if(userID !== users[0] && userID !== users[1])
        throw new Error("auth failed");
        
        writeMessage(body.chatID, body.type, body.payload);
        
        res.status(200).send({
            success: true,
            message: "Messaggio inviato",
            data: {type: body.type, payload: body.payload}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function createChatReq(req, res) {
    try {
        const body = req.body as { idAccordo: string, idUtente1: string, idUtente2: string }
        if (!Object.keys(body).length) throw new Error("Missing parameters")

        if(await chatExists(body.idAccordo)) throw new Error("chat already exists");
        let token = req.header('x-access-token');
        const decoded = getPayload(token);
        const userID = decoded.id;
        if(userID !== body.idUtente1 && userID !== body.idUtente2) {
            throw new Error("auth failed");
        }

        res.status(200).send({
            success: true,
            message: "Chat creata",
            data: {
                chat: await createChat(body.idAccordo, body.idUtente1, body.idUtente2)
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function getChat(req, res) {
    try { 
        const queryParameters = req.query;
        
        const chatID = queryParameters.chatID;
        const amount = queryParameters.amount;
        const end =  queryParameters.end;
        
        const decoded = getPayload(req.header('x-access-token'));

        let users = await getChatters(chatID as string); 
        if(decoded.id !== users[0] && decoded.id !== users[1]) {
            throw new Error("non puoi guardare questa chat");
        }

        let chat = await getChatById(chatID as string, Number(amount), Number(end)).catch(e => {throw new Error(e.message)});         
        res.status(200).send({
            success: true,
            message: "",
            data: chat
        })
        
        
    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}