import { checkUtente, addUtente, emailConfermata } from "../../database/manager/managerLogin"
import sendMail from "../../database/manager/managerMail"
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import userTokens from "../../database/models/PasswordReset";
import UtenteModel from "../../database/models/Utente";

interface Credenziali {
    username: string;
    password: string;
    email?: string;
}

interface Token {
    token: string;
}

function generateToken(username: string, hashedPassword: string, time = 86400) {
    var payload = { username: username, password: hashedPassword }
    var options = { expiresIn: time } // expires in 24 hours if not specified
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    return token;
}


export async function login(req, res) {
    // cerca utente con username - hashedPw corrispondenti
    let hashedPw = crypto.createHash('md5').update(req.body.password).digest('hex').toString();
    const checkUtenteResult = await checkUtente(req.body.username, hashedPw);
    if (!checkUtenteResult) {
        console.log("utente non trovato")
        res.status(401).send({
            success: false,
            error: "username o password errati"
        });
        return;
    }
    var payload = { id: checkUtenteResult, username: req.body.username, password: hashedPw }
    var options = { expiresIn: 86400 } // expires in 24 hours
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options).toString();
    res.json({
        success: true,
        message: 'Enjoy your token!',
        data: {token: token}
    });
}

export async function registrazione(req, res) {
    try {
        const creds = req.body as Credenziali;
        if (!Object.keys(creds).length) throw new Error("oops! credenziali non formattate correttamente");
        if (!creds.email) throw new Error("email is required");

        let hashedPw = crypto.createHash('md5').update(creds.password).digest('hex');
        const token = generateToken(creds.username, hashedPw, Date.now());

        addUtente(creds.username, hashedPw, creds.email, token);
        //sendMail(creds.email, creds.username, token, "BookBuddyVerify");

        res.status(201).send(
            {
                success: true,
                message: "utente creato, controlla la tua email per confermare l'account",
                data: {token: token}
            });

    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function confermaUtente(req, res) {
    const params = req.query as Token;
    if (!Object.keys(params).length) throw new Error("oops! credenziali non formattate correttamente");

    emailConfermata(params.token).then((result) => {
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

export async function verificaToken(req, res) {
    const params = req.query as Token;
    if (!Object.keys(params).length) throw new Error("oops! credenziali non formattate correttamente");

    jwt.verify(params.token, process.env.SUPER_SECRET, function (err, decoded) {
        if (err) {
            res.status(400).send({
                success: false,
                error: err.message
            });
        } else {
            let user = UtenteModel.findOne({username: decoded.username, hashedPassword: decoded.hashedPw}).exec();
            if(user != null) 
            res.status(200).send({
                success: true,
                message:"token valido",
                data: {}
            });
            else throw new Error("invalid credentials")
        }
    });
}

export async function mandaTokenCambioPw(req, res) {
    try{
        let body = req.body as {username: string}
        if(!Object.keys(body).length) throw new Error("bad request");

        // find user's mail by username
        let user = await UtenteModel.findOne({username: body.username}).exec();
        let mail = user.email;
        if(!user.emailConfermata) throw new Error("mail non ancora confermata");

        // generate token and remember {user, token} pair
        let token = crypto.randomBytes(8).toString('hex');
        let doc = new userTokens({
            username: body.username,
            token: token
        })
        await doc.save().catch(e => {throw new Error(e.message)});
        res.status(200).send({
            success: true,
            message: "richiesta cambio pw registrata",
            data: {}
        })

        // send token to user
        // sendMail(mail, user.username, token, "BookBuddyChangePW");
    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function cambiaPw(req, res) {
    try {
        let body = req.body as {token: string, username: string, newpw: string};
        if(!Object.keys(body).length) throw new Error("bad request");

        // check if user requested a change of password
        let doc = await userTokens.findOne({username: body.username, token: body.token});
        if(!doc) throw new Error("nessuna richiesta cambio pw registrata");
        await doc.deleteOne();

        // if so, change pw to new pw in req body
        let user = await UtenteModel.findOne({username: body.username}).exec();
        user.hashedPassword = crypto.createHash('md5').update(body.newpw).digest('hex');
        await user.save().catch(e => {throw new Error(e.message)});

        res.status(200).send({
            success: true,
            message: "cambio password avvenuto con successo",
            data: {}
        })
        
    } catch(e) {
        res.status(400).send({
            success: true,
            error: e.message
        })
    }

}