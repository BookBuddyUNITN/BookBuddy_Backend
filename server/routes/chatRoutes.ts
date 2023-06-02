import { sendMessageReq, createChatReq } from "../methods/chat";
import express from 'express';

const chatRouter = express.Router();

chatRouter.post("/messaggi/send", sendMessageReq);
chatRouter.post("/create", createChatReq);

export default chatRouter;