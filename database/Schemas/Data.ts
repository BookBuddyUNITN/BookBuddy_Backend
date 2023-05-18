import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    data: Date, // "anno-mese-giorno"
    ora: Number,
    minuti: Number
})

export interface dataInterface {
    data: Date,
    ora: Number,
    minuti: Number
}

export default dataSchema