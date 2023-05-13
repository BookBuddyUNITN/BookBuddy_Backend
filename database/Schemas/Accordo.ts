import mongoose from 'mongoose';

export const AccordoSchema = new mongoose.Schema({
    userID_1: { type: String, required: true },
    userID_2: { type: String, required: true },
    data: { type: Date, required: true },
    libro: { type: String, required: true },
    libri_proposti: { type: String, required: true },
    libro_scelto: { type: String, required: true },
    stato: { type: String, required: true }
});

export const AccordoModel = mongoose.model('Accordo', AccordoSchema);
