import scambioModel, { scambioInterface } from '../Schemas/Scambio'
import { locationInterface } from '../Schemas/Location';
import mongoose from 'mongoose';

export async function createScambio(utente1: string, utente2: string, location: locationInterface, data: Date, scambioAccettato: boolean = false) {
    const scambio = new scambioModel({
        utente1: utente1, utente2: utente2, 
        location: {long: location.long, lat: location.lat}, 
        data: data,
        scambioAccettato: scambioAccettato}); 
    let newId = ""
    await scambio.save()
        .then(result => newId = result._id.toString())
    return newId
}

export async function removeScambio(id: string) {
    return scambioModel.deleteOne({_id: id})
}

export async function accettaScambio(id: string) {
    let scambio = await scambioModel.findOne({_id: id} 
    ).exec()

    if (!Object.keys(scambio).length) {
        console.log("scambio not found")
        return false
    }
    scambio.scambioAccettato = true
    return scambio.save() 
}