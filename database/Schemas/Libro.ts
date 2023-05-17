import mongoose from 'mongoose';

export interface LibroInterface {
  titolo: string;
  autore: string;
  ISBN: string;
  recensioni: recensione[];
}

export interface CopialibroInterface {
  ISBN: string,
  locazione: { loc: number; lat: number };
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

export class copiaLibro {
  ISBN: string;
  locazione: string;
  proprietario: string;
  constructor(ISBN: string, locazione: string, proprietario: string) {
    this.ISBN = ISBN;
    this.locazione = locazione;
    this.proprietario = proprietario;
  }
}

export class libro {
  titolo: string;
  autore: string;
  ISBN: string;
  recensioni: recensione[];
  constructor(titolo: string, autore: string, ISBN: string) {
    this.titolo = titolo;
    this.autore = autore;
    this.ISBN = ISBN;
    this.recensioni = [];
  }
}

const recensioneSchema = new mongoose.Schema({
  testo: { type: String, required: true },
  voto: { type: Number, required: true },
});

const copiaLibroSchema = new mongoose.Schema({
  ISNB: { type: String, required: true },
  locazione: { type: { loc: Number, lat: Number }, required: true },
  proprietario: { type: String, required: true },
});

const libroSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  autore: { type: String, required: true },
  ISBN: { type: String, required: true },
  recensioni: [recensioneSchema],
});

const Libro = mongoose.model('Libro', libroSchema);
const CopiaLibro = mongoose.model('CopiaLibro', copiaLibroSchema);


export { Libro, CopiaLibro };
