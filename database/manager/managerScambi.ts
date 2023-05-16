import scambioModel from '../Schemas/Scambio'
import { locationInterface } from '../Schemas/Location';
import { dataInterface } from '../Schemas/Data';

export async function createScambio(utente1: string, utente2: string, luogo: locationInterface, data: dataInterface, scambioAccettato: boolean = false) {
    const scambio = new scambioModel({
        utente1: utente1, utente2: utente2, 
        longitudine: luogo.long, latitudine: luogo.lat, 
        data: data.data, ora: data.ora, minuti: data.minuti,
        scambioAccettato: scambioAccettato}); 
    let newId = ""
    await scambio.save()
        .then(result => {
            newId = result._id.toString()
        })
    return newId
}

export async function removeScambio(utente1: string, utente2: string, luogo: locationInterface, data: dataInterface) {
    return await scambioModel.deleteOne({
        utente1: utente1, utente2: utente2, 
        longitudine: luogo.long, latitudine: luogo.lat, 
        data: data.data, ora: data.ora, minuti: data.minuti, 
        scambioAccettato: false});
}

export async function accettaScambio(scambioID: string) {
    let scambio = await scambioModel.findOne({_id: scambioID} 
    ).exec()

    if (!Object.keys(scambio).length) {
        console.log("scambio not found")
        return false
    }
    scambio.scambioAccettato = true
    await scambio.save()
    return true
}