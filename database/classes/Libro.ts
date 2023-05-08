import { v4 as uuidv4 } from 'uuid';
import recensione from './recensione';

class recensioneLibro extends recensione {
    id: string;
    constructor(testo: string, voto: number) {
        super(testo, voto)
        this.id = uuidv4();
    }
}

class copiaLibro {
    id: string;
    locazione: string;
    proprietario: string;
    constructor(locazione: string, proprietario: string) {
        this.id = uuidv4();
        this.locazione = locazione;
        this.proprietario = proprietario;
    }
}

export default class Libro {
    titolo: string;
    autore: string;
    ISBN: string;
    recensiones: recensioneLibro[];
    copieLibro: copiaLibro[];
    constructor(titolo: string, autore: string, ISBN: string) {
        this.titolo = titolo;
        this.autore = autore;
        this.ISBN = ISBN;
    }
    addCopiaLibro(locazione: string, proprietario: string) {
        this.copieLibro.push(new copiaLibro(locazione, proprietario));
    }
    addRecensione(testo : string, voto : number) {
        this.recensiones.push(new recensioneLibro(testo, voto));
    }
}

