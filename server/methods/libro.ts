import { getLibri, addLibro, addCopiaLibro, deleteLibro, getLibro } from "../../database/manager/managerLibri"

interface addLibroInterface {
    titolo: NonNullable<string>,
    autore: NonNullable<string>,
    ISBN: NonNullable<string>
}

interface addCopiaLibroInterface {
    titolo: NonNullable<string>,
    autore: NonNullable<string>,
    ISBN: NonNullable<string>,
    locazione: [NonNullable<number>, NonNullable<number>],
    proprietario: NonNullable<string>
}

export async function GetLibriReq(req, res) {
    try {
        res.send(await getLibri())
    } catch (e) {
        res.status(400).send({
            error: e.message
        })
    }
}

export async function getLibroReq(req, res) {
    try {
        const result = req.body as { ISBN: NonNullable<string> }
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        res.send(await getLibro(result.ISBN))
    } catch (e) {
        res.status(400).send({
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
        if (!Object.keys(result).length) throw new Error("Copia libro is required")
        const saved = await addCopiaLibro(result.titolo, result.autore, result.ISBN, result.locazione, result.proprietario)
        res.status(201).send({
            success: true,
            message: "Copia libro added",
            data: saved
        })
    } catch (e) {
        res.status(400).send({
            error: e.message
        })
    }
}

export async function deleteBookReq(req, res) {
    try {
        const result = req.body as { ISBN: NonNullable<string> }
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        deleteLibro(result.ISBN)
        res.send("result deleted")
    } catch (e) {
        res.status(400).send({
            error: e.message
        })
    }
}