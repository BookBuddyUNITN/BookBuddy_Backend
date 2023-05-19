import mongoose from 'mongoose';

export const AccordoSchema = new mongoose.Schema({
    userID_1: { type: String, required: true },
    userID_2: { type: String, required: true },
    data: { type: Date, required: true },
    libro: { type: String, required: true },
    libri_proposti: { type: [String], required: true, default: [] },
    libro_scelto: { type: String, required: false },
    stato: { type: String, required: false, default: "in attesa" }
});

export const AccordoModel = mongoose.model('Accordo', AccordoSchema);
