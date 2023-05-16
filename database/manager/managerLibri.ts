import Libro, { LibroInterface, recensione, copiaLibro, libro } from "../Schemas/Libro";
import { locationInterface } from "../Schemas/Location";

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

export async function addCopiaLibro(ISBN: string, locazione: locationInterface, proprietario: string) {
    let status = false;
    Libro.findOne({ ISBN: ISBN }, (err : any, libro : LibroInterface) => {
        if (err) status = false;
        libro.copieLibro.push(new copiaLibro(locazione, proprietario));
        return status = true;
    });

    return status;
}

export async function removeCopiaLibro(ISBN: string, proprietario: string) {
    let status = await Libro.updateOne({ISBN: ISBN}, {
        $pullAll: {proprietario: proprietario}
    });

    return status.acknowledged
}

export async function getLibro(ISBN: string) {
    Libro.findOne({ ISBN: ISBN }, (err : any, libro : LibroInterface) => {
        if (err) return false;
        return libro;
    })
}

export async function deleteLibro(ISBN: string) {
    return await Libro.deleteOne({ ISBN: ISBN });
}

export async function getLibri() {
    return await Libro.find();
}