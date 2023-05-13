import { AccordoModel } from "../Schemas/Accordo";
import { addAccordoToUtente, removeAccordo } from "./managerUtenti";


export async function addAccordo(userID_1: string, userID_2: string, data: Date, libro: string) {
    const accordo = new AccordoModel({ userID_1: userID_1, userID_2: userID_2, data: data, libro: libro }) as any;
    await addAccordoToUtente(accordo._id, userID_1);
    await addAccordoToUtente(accordo._id, userID_2);
    return await accordo.save();
}

export async function deleteAccordo(id: string) {
    const accordo = AccordoModel.findOne({ _id: id }) as any;
    await removeAccordo(id, accordo.userID_1);
    await removeAccordo(id, accordo.userID_2);
    return await AccordoModel.deleteOne({ _id: id });
}

export async function setLibroScelto(id: string, libro: string) {
    return await AccordoModel.updateOne({ _id: id }, { libro_scelto: libro });
}

export async function setStato(id: string, stato: string) {
    return await AccordoModel.updateOne({ _id: id }, { stato: stato });
}

export async function setLibriProposti(id: string, libri_proposti: string[]) {
    return await AccordoModel.updateOne({ _id: id }, { libri_proposti: libri_proposti });
}

export async function getAccordo(id: string) {
    return await AccordoModel.findOne({ _id: id });
}

export async function getAccordi() {
    return await AccordoModel.find();
}