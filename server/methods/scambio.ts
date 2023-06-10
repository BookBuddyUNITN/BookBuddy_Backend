import { getPayload } from '../../database/manager/managerLogin';
import { createScambio, removeScambio, accettaScambio, getScambioById, checkIfIsOwner } from '../../database/manager/managerScambi'
import locationInterface from '../../database/models/Location'

import { checkLibroByID } from '../../database/manager/managerLibri';
import { checkUtenteByID } from '../../database/manager/managerUtenti';

interface richiediScambioInterface {
    utente2: string,
    libro1: string,
    libro2: string,
    location: locationInterface,
    data: Date
}

interface scambioIdInterface {
    id: string,
}

export async function proponiScambio(req, res) {
    try {
        let body = req.body as richiediScambioInterface
        if (!Object.keys(body).length) throw new Error("errore nel body della richiesta");
        const decoded = getPayload(req.header('x-access-token'));
        if (!await checkUtenteByID(body.utente2)) throw new Error("utente non trovato");
        if (!await checkLibroByID(body.libro1)) throw new Error("libro1 non trovato");
        if (!await checkLibroByID(body.libro2)) throw new Error("libro2 non trovato");
        let id = await createScambio(decoded.id, body.utente2, body.libro1, body.libro2, body.location, Date.now());
        res.status(201).send({
            success: true,
            message: "scambio creato con successo",
            data: id
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function annullaScambio(req, res) {
    try {
        let body = req.query as scambioIdInterface
        const decoded = getPayload(req.header('x-access-token'));
        if(!await checkIfIsOwner(body.id, decoded.id)) throw new Error("non sei il proprietario di questo scambio")
        let result = await removeScambio(body.id)
        if (result.deletedCount === 0) {
            throw new Error("non ho cancellato niente")
        }
        res.status(200).send({
            success: true,
            message: "scambio annullato con successo",
            data: {}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function confermaScambio(req, res) {
    try {
        let body = req.body as scambioIdInterface
        const decoded = getPayload(req.header('x-access-token'));
        if(!await checkIfIsOwner(body.id, decoded.id)) throw new Error("non sei il proprietario di questo scambio")
        if (! await accettaScambio(body.id))
            throw new Error("scambio non trovato")
        res.status(200).send({
            success: true,
            message: "scambio confermato con successo",
            data: {}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function getScambio(req, res) {
    try {
        let body = req.query as scambioIdInterface
        let result = await getScambioById(body.id)
        res.status(200).send({
            success: true,
            message: "scambio trovato con successo",
            data: result
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}
