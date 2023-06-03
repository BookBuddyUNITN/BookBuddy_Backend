import scambioModel from '../models/Scambio'
import { locationInterface } from '../models/Location';
import { getPayload } from './managerLogin';

export async function createScambio(utente1: string, utente2: string, luogo: locationInterface, data: Date, scambioAccettato: boolean = false) {
    const scambio = new scambioModel({
        utente1: utente1, utente2: utente2,
        longitudine: luogo.lon, latitudine: luogo.lat,
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

export async function removeScambio(id: string, token: string) {
    const decoded = getPayload(token)
    return scambioModel.deleteOne({ _id: id, utente1: decoded.username })
}

export async function accettaScambio(id: string, token: string) {
    const decoded = getPayload(token)
    let scambio = await scambioModel.findOne({ _id: id, utente2: decoded.username }
    ).exec()

    if (!Object.keys(scambio).length) {
        console.log("scambio not found")
        return null
    }
    scambio.scambioAccettato = true
    await scambio.save()
    return scambio
}