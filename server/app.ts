import express from "express"
import { getLibri, addLibro, addCopiaLibro, deleteLibro, getLibro } from "../database/manager/managerLibri"
import jwt from "jsonwebtoken"
import { checkUtente } from "../database/manager/managerLogin"
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

interface Credenziali {
    username: string;
    password: string;
}

//TODO: fixare l'error che deve dare in caso arrivi null dal req.body

function generateToken(username: string, password: string) {
    var payload = { username: username, password: password }
    var options = { expiresIn: 86400 } // expires in 24 hours
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
    
    return token;
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
    
    
    app.listen(3456, () => {
        console.log("Server running on port 3456")
    })
}