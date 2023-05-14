import UtenteModel from "../Schemas/Utente";

export async function addUtente(nickname: string, credenziali: string) {
    const utente = new UtenteModel({ nickname: nickname, credenziali: credenziali });
    return await utente.save();
}

export async function getUtente(id: string) {
    return await UtenteModel.findOne({ _id: id });
}

export async function addAccordoToUtente(accordoID: string, userID: string) {
    if(!accordoID || !userID) {
        return false;
    }
    try {
        const res = UtenteModel.updateOne({ _id: userID }, { $push: { accordi: accordoID } });
        return res
    } catch (err) {
        return false;
    }

}

export async function removeAccordo(accordoID: string, userID: string) {
    if(!accordoID || !userID) {
        return false;
    }
    try {
        const res = UtenteModel.updateOne({ _id: userID }, { $pull: { accordi: accordoID } });
        return res
    } catch (err) {
        return false;
    }
}