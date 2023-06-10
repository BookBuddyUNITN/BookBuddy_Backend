import mongoose from 'mongoose'
import Location from '../classes/Location'
import Data from '../classes/Data';

export interface scambioInterface {
    utente1: string;
    utente2: string;
    libro1: string,
    libro2: string,
    luogo: Location;
    data: Data;
    scambioAccettato: boolean;
}

export const scambioSchema = new mongoose.Schema({
    utente1: {type: String, required: true},
    utente2: {type: String, required: true},

    libro1: {type: String, required: true},
    libro2: {type: String, required: true},

    locazione: { type: { loc: Number, lat: Number }, required: true },

    data: {type: Date, required: true},

    scambioAccettato: Boolean,
})


const scambioModel = mongoose.model('scambioModel', scambioSchema)
export default scambioModel
