import UtenteModel from "../Schemas/Utente";

export async function checkUtente(username: string, hashedPassword: string) { 
    const found = await UtenteModel.findOne({ username, hashedPassword}); // as UtenteInterface;
    if(!found) {
        return false;
    }
    return true;
}

export async function addUtente(username: string, hashedPassword: string, email: string, token: string) {
    const utente = new UtenteModel({ username: username, hashedPassword: hashedPassword, email: email, tokenConferma: token, emailConfermata: false });
    return utente.save();
}

export async function emailConfermata(token: string) {
    const found = await UtenteModel.findOne({ tokenConferma: token });
    if(!found) {
        return false;
    }
    found.emailConfermata = true;
    found.tokenConferma = "";
    return found.save();
}
