import { ObjectId } from 'mongodb';
import {createScambio, removeScambio, accettaScambio } from '../../database/manager/managerScambi'
import {locationInterface} from '../../database/Schemas/Location'
import { scambioInterface } from '../../database/Schemas/Scambio';

interface richiediScambioInterface {
    utente1: string,
    utente2: string,
    location: locationInterface,
    data: Date,
    scambioAccettato: boolean
}

interface accettaScambioInterface {
    id: string,
}

export async function proponiScambio(req, res) {
    try{
        let body = req.body as richiediScambioInterface
        if(!Object.keys(body).length) throw new Error("errore nel body della richiesta");
        let id = await createScambio(body.utente1, body.utente2, body.location, body.data);
        res.status(200).send({
            success: true,
            message: "scambio creato con successo",
            data: id
        })
    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function annullaScambio(req, res) {
    try{
        let body = req.body as accettaScambioInterface
        let result = await removeScambio(body.id)
        
        if(result.deletedCount === 0) {
            throw new Error("non ho cancellato niente")
        }
        
        res.status(200).send({
            success: true,
            message: "scambio annullato con successo",
            data: {}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function confermaScambio(req, res) {
     try {
        let body = req.body as accettaScambioInterface
        if(! await accettaScambio(body.id)) 
            throw new Error("scambio non trovato")
        res.status(200).send({
            success: true,
            message: "scambio confermato con successo",
            data: {}
        })
    } catch(e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}
