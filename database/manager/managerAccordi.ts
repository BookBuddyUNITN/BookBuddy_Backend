import { AccordoModel } from "../models/Accordo";
import { addAccordoToUtente, removeAccordo, checkUtenteByID } from "./managerUtenti";

import jwt from "jsonwebtoken";

async function checkIfIsOwner(idAccordo: string, idUser: string) {
    const res = await AccordoModel.findOne({ _id: idAccordo })
    console.log(res.userID_1,res.userID_2)
    return [res.userID_1 === idUser , res.userID_2 === idUser]
}


export async function addAccordo(token: string, userID_2: string, data: Date, libro: string, libri_proposti: string[]) {
    try {
        const decodedToken = jwt.decode(token) as any;
        const userID_1 = decodedToken.id
        await Promise.all([checkUtenteByID(userID_1), checkUtenteByID(userID_2)]);
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

export async function deleteAccordo(token : string, id: string) {
    const decodedToken = jwt.decode(token) as any;
    const userID = decodedToken.id
    const res = checkIfIsOwner(id, userID)
    if (!res[0] || !res[1]) throw "Operazione non permessa!"
        const accordo = await AccordoModel.findOne({ _id: id }) as any;
    if (!accordo || accordo === null) {
        throw "Accordo non trovato";
    }
    const result = await Promise.all([removeAccordo(id, accordo.userID_1), removeAccordo(id, accordo.userID_2)]) as any;
    if (!result[0] || !result[1]) {
        throw "Errore nella rimozione dell'accordo agli utenti";
    }
    return await AccordoModel.deleteOne({ _id: id });
}

export async function setLibroScelto(token : string, id: string, libro: string) {
    const decodedToken = jwt.decode(token) as any;
    const userID = decodedToken.id
    const res = await checkIfIsOwner(id, userID)
    if (!res[1]) throw "Operazione non permessa!"
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