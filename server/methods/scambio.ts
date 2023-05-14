import {createScambio, removeScambio, accettaScambio} from '../../database/manager/managerScambi'
import locationSchema, {locationInterface} from '../../database/Schemas/Location'
import dataSchema, {dataInterface} from '../../database/Schemas/Data'

interface richiediScambioInterface {
    utente1: string,
    utente2: string,
    location: locationInterface,
    data: dataInterface 
}

interface accettaScambioInterface {
/*
libroID nello schema dello scambio -> con tutti gli attributi dello schema dello scambio a questo punto si potrebbe identificare uno scambio univocamente
*/
    utente1: string,
    utente2: string,

    libro1: string, // libro in possesso del primo utente prima dello scambio
    libro2: string,
}

// richiesta scambio -> in body: utente1(self), utente2, Location, data
export async function proponiScambio(req, res) {
    try{
        let body = req.body as richiediScambioInterface
        if(!Object.keys(body).length) throw new Error("errore nel body della richiesta");
        createScambio(body.utente1, body.utente2, body.location, body.data);
        res.status(200).send("scambio creato")
    } catch(e) {
        res.status(400).send({error: e})
    }
}

export async function annullaScambio(req, res) {
    try{
        // erase element
        let body = req.body as richiediScambioInterface
        if (!removeScambio(body.utente1, body.utente2, body.location, body.data) ){
            throw new Error("scambio non trovato")
        }
        res.status(200).send("scambio annullato con successo")
    } catch (e) {
        res.status(400).send({error: e})
    }
}


// accetta scambio -> in body: utente1(self), scambioID