import express from "express"
import { getLibri, addLibro, addCopiaLibro, deleteLibro, getLibro } from "../database/manager/managerLibri"
import jwt from "jsonwebtoken"
import { checkUtente, addUtente, emailConfermata } from "../database/manager/managerLogin"
import { sendMail } from "../database/manager/managerMail"
import crypto from "crypto"

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

//TODO: fixare l'error che deve dare in caso arrivi null dal req.body

interface Credenziali {
    username: string;
    password: string;
    email?: string;
}

interface Token {
    token: string;
}

//TODO: fixare l'error che deve dare in caso arrivi null dal req.body

function generateToken(username: string, password: string, time = 86400) {
    var payload = { username: username, password: password }
    var options = { expiresIn: time } // expires in 24 hours if not specified
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    return token;
}

function verifyToken(username: string, password: string) {

    return "placeholder";
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
            const result = req.body as { ISBN: NonNullable<string> }
            if (!Object.keys(result).length) throw new Error("ISBN is required")
            res.send(await getLibro(result.ISBN))
        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })

    app.post("/libro", (req, res) => {
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
    })

    app.put("/libro", (req, res) => {
        try {
            const result = req.body as addCopiaLibroInterface
            if (!Object.keys(result).length) throw new Error("ISBN is required")
            addCopiaLibro(result.ISBN, result.locazione, result.proprietario)
            res.send("Copia result added")
        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })

    app.delete("/libro", (req, res) => {
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
    })

    app.post("/users/login", (req, res) => {
        try {
            const creds = req.body as Credenziali
            if (!Object.keys(creds).length) throw new Error("oops! credenziali non formattate correttamente")

            const hashedPw = crypto.createHash('sha256').update(req.body.password).digest('hex');

            if (checkUtente(req.body.username, hashedPw)) {
                const token = generateToken(creds.username, creds.password);
                res.status(200).send({
                    token: token
                })
            } else {
                throw new Error("user not found");
            }
        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })

    app.post("/users/registrazione", (req, res) => {
        try {
            const creds = req.body as Credenziali;
            if (!Object.keys(creds).length) throw new Error("oops! credenziali non formattate correttamente");
            if (!creds.email) throw new Error("email is required");

            const token = generateToken(creds.username, creds.password, 300);
            addUtente(creds.username, creds.password, creds.email, token);
            sendMail(creds.email, token);

            res.status(201).send("utente creato, controlla la tua email per confermare l'account");

        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }
    })

    app.post("/users/registrazione/token", (req, res) => {
        try {
            const creds = req.body as Token;
            if (!Object.keys(creds).length) throw new Error("oops! credenziali non formattate correttamente");

            if(emailConfermata(creds.token)){
                res.status(200).send("utente attivato correttamente");
            } else {
                // TODO: da gestire se il token non è valido in casao di brute force attack
                throw new Error("token non valido");
            }

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