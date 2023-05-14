import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    anno: Number,
    mese: Number,
    giorno: Number,
    ora: Number,
    minuti: Number
})

export interface dataInterface {
    anno: Number,
    mese: Number,
    giorno: Number,
    ora: Number,
    minuti: Number
}

export default dataSchema