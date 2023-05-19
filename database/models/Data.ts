import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    data: Date, // "anno-mese-giorno" 
})

export default dataSchema