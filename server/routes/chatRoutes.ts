import { sendMessageReq, createChatReq, getChat} from "../methods/chat";
import express from "express";
const chatRouter = express.Router();

chatRouter.post("/messaggi/send", sendMessageReq);
chatRouter.post("/create", createChatReq);
chatRouter.get("/myChat", getChat);

export default chatRouter;