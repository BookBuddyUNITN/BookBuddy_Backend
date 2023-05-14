import scambioModel, { scambioInterface } from '../Schemas/Scambio'
import { locationInterface } from '../Schemas/Location';
import { dataInterface } from '../Schemas/Data';

export async function createScambio(utente1: string, utente2: string, luogo: locationInterface, data: dataInterface, scambioAccettato: boolean = false) {
    const scambio = new scambioModel({
        utente1: utente1, utente2: utente2, 
        longitudine: luogo.long, latitudine: luogo.lat, 
        dataAnno: data.anno, dataMese: data.mese, dataGiorno: data.giorno, dataOra: data.ora, dataMinuti: data.minuti, 
        scambioAccettato: scambioAccettato});

    return await scambio.save();
}

export async function removeScambio(utente1: string, utente2: string, luogo: locationInterface, data: dataInterface) {
    return await scambioModel.deleteOne({
        utente1: utente1, utente2: utente2, 
        longitudine: luogo.long, latitudine: luogo.lat, 
        dataAnno: data.anno, dataMese: data.mese, dataGiorno: data.giorno, dataOra: data.ora, dataMinuti: data.minuti, 
        scambioAccettato: false});
}

export async function accettaScambio(utente1: string, utente2: string, luogo: locationInterface, data: dataInterface) {
    let scambio = await scambioModel.findOne({
        utente1: utente1, utente2: utente2, 
        longitudine: luogo.long, latitudine: luogo.lat, 
        dataAnno: data.anno, dataMese: data.mese, dataGiorno: data.giorno, dataOra: data.ora, dataMinuti: data.minuti}
    ).exec()

    if (scambio) {
        scambio.scambioAccettato = true;
        scambio.save()
    } else {
        console.log("scambio not found")
    }

}
