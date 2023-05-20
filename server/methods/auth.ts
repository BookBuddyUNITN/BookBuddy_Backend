import { checkUtente, addUtente, emailConfermata } from "../../database/manager/managerLogin"
import { sendMail } from "../../database/manager/managerMail"
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
    // let user = await Student.findOne({ email: req.body.email }).exec()
    const password = "test"
    // if (!user) res.json({ success: false, message: 'User not found' })
    if (password != req.body.password) {
        res.json({ success: false, message: 'Wrong password' })
        return
    }
    // user authenticated -> create a token
    var payload = { pinco: "pallino" }
    var options = { expiresIn: 86400 } // expires in 24 hours
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
    res.json({
        success: true, 
        message: 'Enjoy your token!',
        token: token
    });
}

export async function registrazione (req, res) {
    try {
        const creds = req.body as Credenziali;
        if (!Object.keys(creds).length) throw new Error("oops! credenziali non formattate correttamente");
        if (!creds.email) throw new Error("email is required");

        // const token = generateToken(creds.username, creds.password, 300);
        const token = "000000"
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

        if(emailConfermata(creds.username, creds.token)){
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
