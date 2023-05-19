import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import locationSchema, { locationInterface } from './Location';

export interface LibroInterface {
  titolo: string;
  autore: string;
  ISBN: string;
  recensioni: recensione[];
  copieLibro: copiaLibro[];
}

export class recensione{
  id: string;
  testo: string;
  voto: number;
  constructor(testo: string, voto: number) {
    this.id = uuidv4();
    this.testo = testo;
    this.voto = voto;
  }
}

export class copiaLibro{
  id: string;
  locazione: locationInterface;
  proprietario: string;
  constructor(locazione: locationInterface, proprietario: string) {
    this.id = uuidv4();
    this.locazione = locazione;
    this.proprietario = proprietario;
  }
}

export interface CopialibroInterface {
  ISBN: string,
  id: string;
  locazione: locationInterface;
  proprietario: string;
}


export class libro {
  titolo: string;
  autore: string;
  ISBN: string;
  recensioni: recensione[];
  copieLibro: copiaLibro[];
  constructor(titolo: string, autore: string, ISBN: string) {
    this.titolo = titolo;
    this.autore = autore;
    this.ISBN = ISBN;
    this.recensioni = [];
    this.copieLibro = [];
  }
}

const recensioneSchema = new mongoose.Schema({
  id: { type: String, required: true },
  testo: { type: String, required: true },
  voto: { type: Number, required: true },
});

const copiaLibroSchema = new mongoose.Schema({
  id: { type: String, required: true },
  locazione: { type: locationSchema, required: true },
  proprietario: { type: String, required: true },
});

const libroSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  autore: { type: String, required: true },
  ISBN: { type: String, required: true },
  recensioni: [recensioneSchema],
  copieLibro: [copiaLibroSchema],
});

const Libro = mongoose.model('Libro', libroSchema);


export default Libro;
