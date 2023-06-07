import mongoose from 'mongoose';

export const listaGeneri = ['Fantasy', 'Avventura', 'Giallo', 'Horror', 'Storico', 'Romanzo', 'Biografia', 'Saggistica', 'Altro'];


export interface CopialibroInterface {
  ISBN: string,
  locazione: [number, number];
  proprietario: string;
}


const recensioneSchema = new mongoose.Schema({
  testo: { type: String, required: true },
  voto: { type: Number, required: true },
  utenteID: {type: String, required: true},
  username: {type: String, required: true}
});

export interface recensioneLibroInterface {
  testo: String,
  voto: Number,
  utenteID: String,
  username: String
}

const copiaLibroSchema = new mongoose.Schema({
  ISBN: { type: String, required: true },
  locazione: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  proprietario: { type: String, required: true },
},
  { timestamps: true }
);

const libroSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  autore: { type: String, required: true },
  ISBN: { type: String, required: true },
  generi: { type: [String], required: true },
  recensioni: [recensioneSchema],
});

libroSchema.index({ ISBN: 1 }, { unique: true });
copiaLibroSchema.index({ locazione: '2dsphere' });

const Libro = mongoose.model('Libro', libroSchema);
const CopiaLibro = mongoose.model('CopiaLibro', copiaLibroSchema);


export { Libro, CopiaLibro };