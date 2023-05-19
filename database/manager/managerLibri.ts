import Libro, { LibroInterface, recensione, CopialibroInterface } from "../models/Libro";
import { locationInterface } from "../models/Location";

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
    let libroDocument = await Libro.findOne({ ISBN: ISBN }).exec();
    if(!libroDocument) return false;
    if(!Object.keys(libroDocument).length) return false;

    let copia = ({ISBN: ISBN, id: "not used", locazione: locazione, proprietario: proprietario}) as CopialibroInterface;
    libroDocument.copieLibro.push(copia);
    await libroDocument.save();
    return true;
}

export async function removeCopiaLibro(ISBN: string, proprietario: string) {
    let status = await Libro.updateOne({ISBN: ISBN}, {
        $pull: { copieLibro: {proprietario: proprietario}}
    })
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