import mongoose from 'mongoose';

export const listaGeneri = ['Fantasy', 'Avventura', 'Giallo', 'Horror', 'Storico', 'Romanzo', 'Biografia', 'Saggistica', 'Altro'];

export interface LibroInterface {
  titolo: string;
  autore: string;
  ISBN: string;
  generi: string[];
  rating: number;
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
  id: string
  constructor(testo: string, voto: number, id: string) {
    this.testo = testo;
    this.voto = voto;
    this.id = id;
  }
}

export class libro {
  titolo: string;
  autore: string;
  ISBN: string;
  generi: string[];
  recensioni: recensione[];
  constructor(titolo: string, autore: string, ISBN: string, generi: string[], recensioni: recensione[]) {
    this.titolo = titolo;
    this.autore = autore;
    this.ISBN = ISBN;
    this.generi = generi;
    this.recensioni = recensioni;
  }
}

const recensioneSchema = new mongoose.Schema({
  testo: { type: String, required: true },
  voto: { type: Number, required: true },
  recensioneID: {type: String, required: true}
});

export interface recensioneLibroInterface {
  testo: String,
  voto: Number,
  recensioneID: String
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

copiaLibroSchema.index({ locazione: '2dsphere' });

const Libro = mongoose.model('Libro', libroSchema);
const CopiaLibro = mongoose.model('CopiaLibro', copiaLibroSchema);


export { Libro, CopiaLibro };