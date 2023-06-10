import { createChat, getChatById, writeMessage, getChatters, chatExists } from "../../database/manager/managerChat";
import jwt from "jsonwebtoken"
import UtenteModel from "../../database/models/Utente";
import url from 'url'
import { idFromUsername } from "../../database/manager/managerUtenti";

export async function sendMessageReq(req, res) {
    try {
        const body = req.body as {type: string, payload: string, chatID: string}; 
        const token = req.headers['x-access-token'];
        
        if (!Object.keys(body).length) throw new Error("bad request"); 
        
        // decode token to get username
        let decoded = jwt.verify(token, process.env.SUPER_SECRET);
        let username = decoded.username;
        if(!username) throw new Error("bad token");
        
        // find username's _id in database
        // let userDocument = await UtenteModel.findOne({username: username}).exec();
        let userID = await idFromUsername(username);
        
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

        if(chatExists(body.idAccordo)) throw new Error("chat already exists");
        let token = req.headers['x-access-token'];
        const username = jwt.verify(token, process.env.SUPER_SECRET).username;

        const userID = await idFromUsername(username);
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
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function getChat(req, res) {
    try { 
        const parsedUrl = url.parse(req.url, true);
        const queryParameters = parsedUrl.query;
        
        const chatID = queryParameters.chatID;
        const amount = queryParameters.amount;
        const end =  queryParameters.end;
        
        const decoded = jwt.verify(req.headers['x-access-token'], process.env.SUPER_SECRET);
        const user = await UtenteModel.findOne({username: decoded.username}).exec();

        let users = await getChatters(chatID as string); 
        if(user._id.toString()!== users[0] && user._id.toString() !== users[1]) {
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