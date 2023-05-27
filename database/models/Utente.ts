import mongoose from 'mongoose';

const recensioneUtenteSchema = new mongoose.Schema({
  voto: {type: Number, required: true},
  recensioneID: {type: String, required: true}
})

const UtenteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  tokenConferma: { type: String },
  emailConfermata: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
  accordi: [{ type: [String], required: false, default: [] }],
  recensioni: [recensioneUtenteSchema]
});

const UtenteModel = mongoose.model('UtenteModel', UtenteSchema);

export default UtenteModel;