import { getPayload } from "../../database/manager/managerLogin";

import { lasciaRecensioneLibro, eliminaRecensioneLibro, getRecensioniLibro } from "../../database/manager/managerRecensioni";

export async function lasciaRecensioneReq(req, res) {
    try {
        const body = req.body;
        if (!Object.keys(body).length) throw new Error("bad request");
        if (body.voto as number > 5 || body.voto as number < 0) throw new Error("recensione non valida");
        let decoded = getPayload(req.header('x-access-token'));
        if (!decoded.id) throw new Error("idUtente is required");
        const result = await lasciaRecensioneLibro(body.testo, body.voto, decoded.id, body.isbn, decoded.username)
        res.status(201).send({
            success: true,
            message: "Recensione lasciata",
            data: {
                libro: result,
                recensione: { ...body, utenteID: decoded.id, username: decoded.username }
            }
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        });
    };

}

export async function eliminaRecensioneLibroReq(req, res) {
    try {
        const body = req.query;
        if (!Object.keys(body).length) throw new Error("bad request");
        const result = await eliminaRecensioneLibro(body.isbn, body.recensione_id)
        res.status(200).send({
            success: true,
            message: "Recensione eliminata",
            data: {
                libro: result
            }
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        });
    };

}

export async function getRecensioniLibroReq(req, res) {
    try {
        const body = req.query as { isbn: string };
        if (!Object.keys(body).length) throw new Error("bad request");
        const result = await getRecensioniLibro(body.isbn)
        res.status(200).send({
            success: true,
            message: "Recensioni trovate",
            data: {
                recensioni: result
            }
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        });
    };

}
