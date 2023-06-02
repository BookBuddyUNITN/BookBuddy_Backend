import { Libro, CopiaLibro, recensione, libro, listaGeneri } from "../models/Libro";
import axios from "axios";

export interface addlibroInterface {
    titolo: string,
    autore: string,
    ISBN: string,
    generi: string[],
}

async function translateISBN(isbn: string) {
    try {
        const response = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + isbn + "&jscmd=data&format=json");
        const data = response.data;
        if (data["ISBN:" + isbn]) {
            return {
                titolo: data["ISBN:" + isbn].title as string,
                autore: data["ISBN:" + isbn].authors[0].name as string,
                ISBN: isbn as string,
                generi: data["ISBN:" + isbn].subjects.map((subject: any) => subject.name)
            }
        }
    } catch (e) {
        return false;
    }
}

export async function addLibroByISBN(isbn: string) {
    const libro = await translateISBN(isbn) as addlibroInterface;
    return await addLibro(libro.titolo, libro.autore, libro.ISBN, libro.generi);
}

export async function addLibro(titolo: string, autore: string, ISBN: string, generi: string[] = []) {
    const findGenere = [];
    if (generi.length > 0) {
        generi.forEach(genere => {
            if (listaGeneri.includes(genere)) {
                findGenere.push(genere);
            } else {
                findGenere.push("Altro");
            }
        });
    }
    const libro = new Libro({ titolo: titolo, autore: autore, ISBN: ISBN, generi: findGenere, rating: 0, recensioni: [] });
    return await libro.save();
}

export async function addCopiaLibro(titolo: string, autore: string, ISBN: string, generi: string[] = [], locazione: [number, number], proprietario: string) {
    const libroDocument = await Libro.findOne({ ISBN: ISBN });
    if (!libroDocument) {
        addLibro(titolo, autore, ISBN, generi)
    }
    const copia = new CopiaLibro({
        ISBN: ISBN, locazione: {
            type: 'Point',
            coordinates: [locazione[0], locazione[1]] // long, lat
        }, proprietario: proprietario
    });
    return await copia.save();
}

export async function removeCopiaLibro(ISBN: string, proprietario: string) {
    await CopiaLibro.deleteOne({ ISBN: ISBN, proprietario: proprietario });
    const copialibro = await CopiaLibro.findOne({ ISBN: ISBN, proprietario: proprietario });
    if (!copialibro) await Libro.deleteOne({ ISBN: ISBN });
}

export async function getLibro(ISBN: string) {
    return await Libro.findOne({ ISBN: ISBN });
}

export async function getLibriByISBNs(ISBN: string[]) {
    return await Libro.find({ ISBN: { $in: ISBN } });
}

export async function getCopieLibro(ISBN: string) {
    return await CopiaLibro.find({ ISBN: ISBN });
}

export async function deleteLibro(ISBN: string) {
    return await Libro.deleteOne({ ISBN: ISBN });
}

export async function deleteCopiaLibro(_id: string) {
    const copia = await CopiaLibro.findOne({ _id: _id });
    if (!copia) return false;
    await CopiaLibro.deleteOne({ _id: _id });
    const copie = await CopiaLibro.findOne({ ISBN: copia.ISBN });
    if (!copie) await Libro.deleteOne({ ISBN: copia.ISBN });
}

export async function getLibri() {
    return await Libro.find();
}