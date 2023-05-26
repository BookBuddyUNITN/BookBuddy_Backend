import { checkUtente, addUtente, emailConfermata } from "../../database/manager/managerLogin"
import sendMail from "../../database/manager/managerMail"
import jwt from "jsonwebtoken"

interface Credenziali {
    username: string;
    password: string;
    email?: string;
}

interface Token {
    username: string;
    token: string;
}

function generateToken(username: string, password: string, time = 86400) {
    var payload = { username: username, password: password }
    var options = { expiresIn: time } // expires in 24 hours if not specified
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    return token;
}


export async function login(req, res) {
    const checkUtenteResult = await checkUtente(req.body.username, req.body.password);
    if (!checkUtenteResult) {
        res.status(401).send({
            success: false,
            error: "username o password errati"
        });
        return;
    }
    var payload = { id: checkUtenteResult, username: req.body.username, password: req.body.password }
    var options = { expiresIn: 86400 } // expires in 24 hours
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
    res.json({
        success: true,
        message: 'Enjoy your token!',
        data:{
            token: token
        }
    });
}

export async function registrazione(req, res) {
    try {
        const creds = req.body as Credenziali;
        if (!Object.keys(creds).length) throw new Error("oops! credenziali non formattate correttamente");
        if (!creds.email) throw new Error("email is required");

        // const token = generateToken(creds.username, creds.password, 300);
        const token = "000000"
        addUtente(creds.username, creds.password, creds.email, token);
        sendMail(creds.email, creds.username, "conferma la tua email con questo token " + token, "BookBuddyVerify");

        res.status(201).send(
            {
                success: true,
                message: "utente creato, controlla la tua email per confermare l'account",
                data: {}
            });

    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function confermaUtente(req, res) {
    const creds = req.body as Token;
    if (!Object.keys(creds).length) throw new Error("oops! credenziali non formattate correttamente");

    emailConfermata(creds.token).then((result) => {
        if (result) {
            res.status(200).send({
                success: true,
                message:"utente attivato correttamente",
                data: {}
            });
        } else {
            // TODO: da gestire se il token non è valido in casao di brute force attack
            throw new Error("token non valido");
        }
    }).catch((err) => {
        res.status(400).send({
            success: false,
            error: err.message
        });
    });
}
