import { CopialibroInterface } from "../../database/models/Libro";
import { addCopiaLibro, removeCopiaLibro } from "../../database/manager/managerLibri";

export async function inserisciCopiaLibro(req, res) {
    try {
        let body = req.body as CopialibroInterface // maybe change the interface to not have the id
        if(!Object.keys(body).length) {
            throw new Error("richiesta non formattata correttamente")
        }
        
        let status = await addCopiaLibro(body.ISBN, body.locazione, body.proprietario)
        if(!status) throw new Error("errore nel db")
        res.status(200).send({
            success: true,
            message: "copia inserita correttamente",
            data: {}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function rimuoviCopiaLibro(req, res) {
    try{
        let body = req.body as CopialibroInterface
        if(!Object.keys(body).length) throw new Error("richiesta non formattata correttamente")
        let status = await removeCopiaLibro(body.ISBN, body.proprietario)
        if(!status) throw new Error("errore nel db")

        res.status(200).send({
            success: true,
            message: "copia rimossa correttamente",
            data: {}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}