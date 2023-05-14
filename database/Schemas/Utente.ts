import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UtenteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: Number, required: true },
  tokenConferma: { type: String },
  emailConfermata: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const UtenteModel = mongoose.model('UtenteModel', UtenteSchema);

export default UtenteModel;