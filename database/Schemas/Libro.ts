import mongoose from 'mongoose';

export interface LibroInterface {
  titolo: string;
  autore: string;
  ISBN: string;
  recensioni: recensione[];
}

export interface CopialibroInterface {
  ISBN: string,
  locazione: [number, number];
  proprietario: string;
}

export class recensione {
  testo: string;
  voto: number;
  constructor(testo: string, voto: number) {
    this.testo = testo;
    this.voto = voto;
  }
}

const recensioneSchema = new mongoose.Schema({
  testo: { type: String, required: true },
  voto: { type: Number, required: true },
});

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
});

const libroSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  autore: { type: String, required: true },
  ISBN: { type: String, required: true },
  recensioni: [recensioneSchema],
});

copiaLibroSchema.index({ locazione: '2dsphere' });

const Libro = mongoose.model('Libro', libroSchema);
const CopiaLibro = mongoose.model('CopiaLibro', copiaLibroSchema);


export { Libro, CopiaLibro };
