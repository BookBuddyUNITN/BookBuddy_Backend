import mongoose from 'mongoose'
import Location  from '../classes/Location'
import Data from '../classes/Data';
import locationSchema, { locationInterface } from './Location';

export interface scambioInterface {
    utente1: string;
    utente2: string;
    libro1ID: string,
    libro2ID: string,
    location: locationInterface;
    data: Data;
    scambioAccettato: boolean;
}

export const scambioSchema = new mongoose.Schema({
    utente1: String,
    utente2: String,

    libro1ID: String,
    libro2ID: String,

    location: locationSchema,

    data: Date,

    scambioAccettato: Boolean,
})


const scambioModel = mongoose.model('scambioModel', scambioSchema)
export default scambioModel
