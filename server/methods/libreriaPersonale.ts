import { CopialibroInterface } from "../../database/models/Libro";
import { addCopiaLibro, removeCopiaLibro, getCopieLibroByUser } from "../../database/manager/managerLibri";
import { getLibriByISBNs } from "../../database/manager/managerLibri";
import { addLibroByISBN, getLibro } from "../../database/manager/managerLibri";

import { getPayload } from "../../database/manager/managerLogin";

export async function getLibri(req, res) {
    try {
        const decoded = getPayload(req.headers["x-access-token"])
        let libri = await getCopieLibroByUser(decoded.id)
        if(!libri.length) throw new Error("non hai libri nella tua libreria personale")
        let isbns = libri.map((libro: any) => libro.ISBN)
        let libriCompleti = await getLibriByISBNs(isbns)
        res.status(200).send({
            success: true,
            message: "libri trovati correttamente",
            data: {
                libri: libriCompleti
            }
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function inserisciCopiaLibro(req, res) {
    // try {
    //     let body = req.body as addCopiaLibroInterface // maybe change the interface to not have the id
    //     if(!Object.keys(body).length) {
    //         throw new Error("richiesta non formattata correttamente")
    //     }
    //     const decoded = getPayload(req.headers["x-access-token"])
    //     let status = await addCopiaLibro(body.titolo, body.autore, body.ISBN, [], body.locazione, decoded.id)
    //     if(!status) throw new Error("errore nel db")
    //     res.status(200).send({
    //         success: true,
    //         message: "copia inserita correttamente",
    //         data: {}
    //     })
    // } catch (e) {
    //     res.status(400).send({
    //         success: false,
    //         error: e.message
    //     })
    // }
    try {
        const result = req.body as { isbn: string, locazione: [number, number] };
        const decoded = getPayload(req.header('x-access-token'));
        let libro = null;
        try {
            libro = await addLibroByISBN(result.isbn);
        } catch (e) {
            if (e.message.includes("duplicate key error")) {
                try {
                    libro = await getLibro(result.isbn);
                } catch (e) {
                    throw new Error("Libro non trovato");
                }
            }
        }
        if (libro === null) throw new Error("Libro non trovato");
        const copialibro = await addCopiaLibro(result.isbn, result.locazione, decoded.id);
        res.status(201).send({
            success: true,
            message: "Elemento aggiunto alla wishlist",
            data: { idUtente: decoded.id, isbn: copialibro.ISBN, libro: libro }
        });
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    };
}

export async function rimuoviCopiaLibro(req, res) {
    try {
        let isbn = req.query.isbn as string
        if (!isbn) throw new Error("isbn non specificato")
        const decoded = getPayload(req.headers["x-access-token"])
        await removeCopiaLibro(isbn, decoded.id)
        res.status(200).send({
            success: true,
            message: "copia rimossa correttamente",
            data: {
                isbn: isbn
            }
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}