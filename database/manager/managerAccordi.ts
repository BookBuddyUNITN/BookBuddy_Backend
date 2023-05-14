import { AccordoModel } from "../Schemas/Accordo";
import { addAccordoToUtente, removeAccordo } from "./managerUtenti";


export async function addAccordo(userID_1: string, userID_2: string, data: Date, libro: string) {
    const accordo = new AccordoModel({ userID_1: userID_1, userID_2: userID_2, data: data, libro: libro }) as any;
    const result = await Promise.all([addAccordoToUtente(accordo._id, userID_1), addAccordoToUtente(accordo._id, userID_2)]) as any;
    if (!result[0] || !result[1]) {
        throw new Error("Errore nell'aggiunta dell'accordo agli utenti");
    }
    return await accordo.save();
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
    return found.save();
}

export async function setStato(id: string, stato: string) {
    const found = await AccordoModel.findOne({ _id: id });
    if (!found || found === null) {
        return false;
    }
    found.stato = stato;
    return found.save();}

export async function setLibriProposti(id: string, libri_proposti: string[]) {
    const found = await AccordoModel.findOne({ _id: id });
    if (!found || found === null) {
        return false;
    }
    found.libri_proposti = libri_proposti;
    return found.save();}

export async function getAccordo(id: string) {
    return await AccordoModel.findOne({ _id: id });
}

export async function getAccordi() {
    return await AccordoModel.find();
}