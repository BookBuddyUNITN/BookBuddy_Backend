import { getLibri, addLibro, addCopiaLibro, deleteLibro, getLibro } from "../../database/manager/managerLibri"

interface addLibroInterface {
    titolo: NonNullable<string>,
    autore: NonNullable<string>,
    ISBN: NonNullable<string>
}

interface addCopiaLibroInterface {
    ISBN: NonNullable<string>,
    locazione: NonNullable<string>,
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
        res.send({
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
        addLibro(result.titolo, result.autore, result.ISBN)
        res.send("result added")
    } catch (e) {
        res.status(400).send({
            error: e.message
        })
    }
}

export async function addCopiaLibroReq(req, res) {
    try {
        const result = req.body as addCopiaLibroInterface
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        addCopiaLibro(result.ISBN, result.locazione, result.proprietario)
        res.send({
            success: true,
            message: "Copia aggiunta",
            data: {}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function deleteBook(req, res) {
    try {
        const result = req.body as { ISBN: NonNullable<string> }
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        deleteLibro(result.ISBN)
        res.send({
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