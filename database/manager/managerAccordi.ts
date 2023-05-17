import { AccordoModel } from "../Schemas/Accordo";
import { addAccordoToUtente, removeAccordo, checkUtenteByID } from "./managerUtenti";


export async function addAccordo(userID_1: string, userID_2: string, data: Date, libro: string, libri_proposti: string[]) {
    try {
        await Promise.all([addAccordoToUtente(userID_1, userID_2), addAccordoToUtente(userID_2, userID_1)]) as any;
        const accordo = new AccordoModel({ userID_1: userID_1, userID_2: userID_2, data: data, libro: libro, libri_proposti: libri_proposti }) as any;
        const res = await accordo.save();
        if (res && res !== null)
            return res;
        else
            throw "Errore nel salvataggio dell'accordo";
    } catch (err) {
        throw "Errore nella creazione dell'accordo";
    }
}

export async function deleteAccordo(id: string) {
    const accordo = await AccordoModel.findOne({ _id: id }) as any;
    if (!accordo || accordo === null) {
        throw new Error("Accordo non trovato");
    }
    const result = await Promise.all([removeAccordo(id, accordo.userID_1), removeAccordo(id, accordo.userID_2)]) as any;
    if (!result[0] || !result[1]) {
        throw new Error("Errore nella rimozione dell'accordo agli utenti");
    }
    return await AccordoModel.deleteOne({ _id: id });
}

export async function setLibroScelto(id: string, libro: string) {
    const found = await AccordoModel.findOne({ _id: id });
    if (!found || found === null) {
        return false;
    }
    found.libro_scelto = libro;
    return await found.save();
}

export async function setStato(id: string, stato: string) {
    const found = await AccordoModel.findOne({ _id: id });
    if (!found || found === null) {
        return false;
    }
    found.stato = stato;
    return await found.save();
}

export async function getAccordo(id: string) {
    return await AccordoModel.findOne({ _id: id });
}

export async function getAccordi() {
    return await AccordoModel.find();
}