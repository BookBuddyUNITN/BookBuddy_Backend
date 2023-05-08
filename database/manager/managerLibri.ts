import Libro, { LibroInterface, recensione, copiaLibro, libro } from "../Schemas/Libro";

export async function addLibro(titolo: string, autore: string, ISBN: string) {
    const libro = new Libro({ titolo: titolo, autore: autore, ISBN: ISBN, recensioni: [], copieLibro: [] });
    return await libro.save();
}

export async function addRecensione(ISBN: string, testo: string, voto: number) {
    const libro = await Libro.findOne({ ISBN: ISBN }) as LibroInterface;
    if(!libro) return false;
    libro.recensioni.push(new recensione(testo, voto));
    return true;
}





