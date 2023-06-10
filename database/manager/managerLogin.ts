import UtenteModel from "../models/Utente";
import jwt from "jsonwebtoken"

export async function checkUtente(username: string, hashedPassword: string) {
    const found = await UtenteModel.findOne({ username: username, hashedPassword: hashedPassword, emailConfermata: true }); // as UtenteInterface;
    if (!found) {
        return false;
    }
    return found._id;
}

export async function addUtente(username: string, hashedPassword: string, email: string, token: string) {
    const utente = new UtenteModel({ username: username, hashedPassword: hashedPassword, email: email, tokenConferma: token, emailConfermata: false });
    return utente.save();
}

export async function emailConfermata(token: string) {
    const found = await UtenteModel.findOne({ tokenConferma: token });
    if (!found || found === null) {
        return false;
    }
    found.emailConfermata = true;
    found.tokenConferma = "";
    return found.save();
}

export function getPayload(token: string) {
    return jwt.verify(token, process.env.SUPER_SECRET)
}
