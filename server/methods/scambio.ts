import {createScambio, removeScambio, accettaScambio} from '../../database/manager/managerScambi'
import {locationInterface} from '../../database/Schemas/Location'
import {dataInterface} from '../../database/Schemas/Data'

interface richiediScambioInterface {
    utente1: string,
    utente2: string,
    location: locationInterface,
    data: dataInterface 
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
        let body = req.body as richiediScambioInterface
        if (! await removeScambio(body.utente1, body.utente2, body.location, body.data) ){
            throw new Error("scambio non trovato")
        }
        res.status(200).send({
            success: true,
            message: "scambio avvenuto con successo",
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
