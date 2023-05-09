import express from "express"
import { getLibri, addLibro, addCopiaLibro, deleteLibro, getLibro } from "../database/manager/managerLibri"

const app = express()

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

export default function runServer() {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))


    app.get("/libri", async (req, res) => {
        try {
            res.send(await getLibri())
        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })
    app.get("/libro", async (req, res) => {
        try {
            const libro = req.body as { ISBN: NonNullable<string> }
            res.send(await getLibro(libro.ISBN))
        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })

    app.post("/libro", (req, res) => {
        try {
            const libro = req.body as addLibroInterface
            addLibro(libro.titolo, libro.autore, libro.ISBN)
            res.send("Libro added")
        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })

    app.put("/libro", (req, res) => {
        try {
            const libro = req.body as addCopiaLibroInterface
            addCopiaLibro(libro.ISBN, libro.locazione, libro.proprietario)
            res.send("Copia libro added")
        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })

    app.delete("/libro", (req, res) => {
        try {
            const libro = req.body as { ISBN: NonNullable<string> }
            deleteLibro(libro.ISBN)
            res.send("Libro deleted")
        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })


    app.listen(3456, () => {
        console.log("Server running on port 3456")
    })
}