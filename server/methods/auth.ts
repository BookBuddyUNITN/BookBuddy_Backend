
import { checkUtente, addUtente, emailConfermata } from "../../database/manager/managerLogin"
import { sendMail } from "../../database/manager/managerMail"
import jwt from "jsonwebtoken"

interface Credenziali {
    username: string;
    password: string;
    email?: string;
}

interface Token {
    token: string;
}

function generateToken(username: string, password: string, time = 86400) {
    var payload = { username: username, password: password }
    var options = { expiresIn: time } // expires in 24 hours if not specified
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    return token;
}

export async function registrazione (req, res) {
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
}

export async function confermaUtente (req, res) {
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
}
