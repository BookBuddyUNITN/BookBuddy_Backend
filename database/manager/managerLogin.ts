import UtenteModel from "../Schemas/Utente";

export async function checkUtente(username: string, hashedPassword: string) { 
    const found = await UtenteModel.findOne({ username, hashedPassword}); // as UtenteInterface;
    if(!found) {
        return false;
    }
    return true;
}

