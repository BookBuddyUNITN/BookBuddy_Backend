import UtenteModel from "../Schemas/Utente";

export async function checkUtente(username: string, hashedPassword: string) { 
    const found = await UtenteModel.findOne({ username, hashedPassword}); // as UtenteInterface;
    if(!found) {
        return false;
    }
    return true;
}

export async function addUtente(username: string, hashedPassword: string, email: string) {
    const utente = new UtenteModel({ username, hashedPassword, email });
    return utente.save();
}
