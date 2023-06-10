import scambioModel from '../models/Scambio'
import { locationInterface } from '../models/Location';
import { getPayload } from './managerLogin';

export async function createScambio(utente1: string, utente2: string, libro1: string, libro2 : string, luogo: locationInterface, data: number, scambioAccettato: boolean = false) {
    const scambio = new scambioModel({
        utente1: utente1, utente2: utente2,
        libro1: libro1, libro2: libro2,
        locazione: luogo,
        data: data,
        scambioAccettato: scambioAccettato
    });
    let newId = ""
    await scambio.save()
        .then(result => {
            newId = result._id.toString()
        })
    return newId
}

export async function removeScambio(id: string) {
    return scambioModel.deleteOne({ _id: id })
}

export async function accettaScambio(id: string) {
    let scambio = await scambioModel.findOne({ _id: id }
    ).exec()

    if (!Object.keys(scambio).length) {
        console.log("scambio not found")
        return null
    }
    scambio.scambioAccettato = true
    await scambio.save()
    return scambio
}

export async function getScambioById(id: string) {
    const res = scambioModel.findOne({ _id: id }).exec()
    return res
}

export async function checkIfIsOwner(id: string, id_utente: string) {
    const res = [await scambioModel.exists({ _id: id, utente1: id_utente }), await scambioModel.exists({ _id: id, utente2: id_utente })]
    if(res[0] || res[1]) return true
    return res
}
