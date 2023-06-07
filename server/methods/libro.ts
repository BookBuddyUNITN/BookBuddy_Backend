import { getLibri, addLibro, addCopiaLibro, deleteLibro, getLibro } from "../../database/manager/managerLibri"

interface addLibroInterface {
    titolo: NonNullable<string>,
    autore: NonNullable<string>,
    ISBN: NonNullable<string>
}

interface addCopiaLibroInterfaceCompleta {
    titolo: NonNullable<string>,
    autore: NonNullable<string>,
    generi: NonNullable<string[]>,
    ISBN: NonNullable<string>,
    locazione: [NonNullable<number>, NonNullable<number>],
    proprietario: NonNullable<string>
}

interface addCopiaLibroInterface {
    ISBN: NonNullable<string>,
    locazione: [NonNullable<number>, NonNullable<number>],
    proprietario: NonNullable<string>
}

export async function GetLibriReq(req, res) {
    try {
        res.send({
            success: true,
            message: "Libri trovati",
            data: {
                libri: await getLibri()
            }
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function getLibroReq(req, res) {
    try {
        const result = req.body as { ISBN: NonNullable<string> }
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        res.status(200).send({
            success: true,
            message: "Libro trovato",
            data: {
                libro: await getLibro(result.ISBN)
            }
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function addLibroReq(req, res) {
    try {
        const result = req.body as addLibroInterface
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        const libro = await addLibro(result.titolo, result.autore, result.ISBN)
        res.status(201).send({
            success: true,
            message: "Libro aggiunto",
            data: {
                libro: libro
            }
        })
    } catch (e) {
        if (e.message.includes("duplicate key error")) {
            res.status(201).send({
                success: true,
                message: "Libro gia presente",
                data: {
                    libro: await getLibro(req.body.ISBN)
                }
            })
        }
        res.status(400).send({
            error: e.message
        })
    }
}

export async function addCopiaLibroReq(req, res) {
    try {
        const ISBN = req.body.ISBN;
        if (!ISBN) throw new Error("ISBN richiesto");
        getLibro(ISBN).then(libro => {
            // libro trovato -> estrai informazioni dal database
            const result = req.body as addCopiaLibroInterface;
            if (!Object.keys(result).length) throw new Error("Errate informazioni sulla copia (locazione e/o proprietario)");
            const objectCopia = {
                titolo: libro.titolo,
                autore: libro.autore,
                ISBN: libro.ISBN,
                generi: libro.generi,
                locazione: result.locazione,
                proprietario: result.proprietario
            }
            addCopiaLibro(objectCopia.titolo, objectCopia.autore, objectCopia.ISBN, objectCopia.generi, objectCopia.locazione, objectCopia.proprietario).then(saved => {
                res.status(201).send({
                    success: true,
                    message: "Copia libro added",
                    data: saved
                })
            });
        }).catch(err => {
            // libro non trovato
            const result = req.body as addCopiaLibroInterfaceCompleta
            if (!Object.keys(result).length) throw new Error("Copia libro is required")
            addCopiaLibro(result.titolo, result.autore, result.ISBN, result.generi, result.locazione, result.proprietario).then(saved => {
                res.status(201).send({
                    success: true,
                    message: "Copia libro added",
                    data: saved
                })
            }).catch(err => {
                res.status(400).send({
                    success: false,
                    error: err.message
                })
            });
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function deleteBookReq(req, res) {
    try {
        const result = req.body as { ISBN: NonNullable<string> }
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        deleteLibro(result.ISBN)
        res.status(200).send({
            success: true,
            message: "Libro eliminato",
            data: {}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}