import mongoose from 'mongoose'
import Location  from '../classes/Location'
import Data from '../classes/Data';

import locationSchema from './Location';
import dataSchema from './Data';

// problem: how to assign ID when creating a new schema?

export interface scambioInterface {
    utente1: string;
    utente2: string;
    libro1ID: string,
    libro2ID: string,
    luogo: Data;
    data: Location;
    scambioAccettato: boolean;
}

export const scambioSchema = new mongoose.Schema({
    utente1: String,
    utente2: String,

    libro1ID: String,
    libro2ID: String,

    longitudine: Number,
    latitudine: Number,

    dataAnno: Number,
    dataMese: Number,
    dataGiorno: Number,
    dataOra: Number,
    dataMinuti: Number,

    scambioAccettato: Boolean,
})


const scambioModel = mongoose.model('scambioModel', scambioSchema)
export default scambioModel
