import { sendMessage, createChat } from "../../database/manager/managerChat";

export async function sendMessageReq(req, res) {
    try {
        const result = req.body as { idChat: string, idMittente: string, idRicevente: string, type: string, content: string }
        if (!Object.keys(result).length) throw new Error("Missing parameters")
        res.status(200).send({
            success: true,
            message: "Messaggio inviato",
            data: {
                messaggio: await sendMessage(result.idChat, result.idMittente, result.idRicevente, result.type, result.content)
            }
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
        const result = req.body as { idAccordo: string, idUtente1: string, idUtente2: string }
        if (!Object.keys(result).length) throw new Error("Missing parameters")
        res.status(200).send({
            success: true,
            message: "Chat creata",
            data: {
                chat: await createChat(result.idAccordo, result.idUtente1, result.idUtente2)
            }
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}