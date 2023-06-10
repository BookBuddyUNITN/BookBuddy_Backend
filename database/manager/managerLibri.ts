import { Libro, CopiaLibro, listaGeneri } from "../models/Libro";
import axios from "axios";

export interface addlibroInterface {
    titolo: string,
    autore: string,
    ISBN: string
}

async function translateISBN(isbn: string) {
    try {
        const response = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:" + isbn + "&jscmd=data&format=json");
        const data = response.data;
        if (data["ISBN:" + isbn]) {
            return {
                titolo: data["ISBN:" + isbn].title as string,
                autore: data["ISBN:" + isbn].authors[0].name as string,
                ISBN: isbn as string
            }
        }
        else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

export async function addLibroByISBN(isbn: string) {
    const libro = await translateISBN(isbn) as addlibroInterface;
    return await addLibro(libro.titolo, libro.autore, libro.ISBN);
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

export async function addCopiaLibro(ISBN: string, locazione: [number, number], proprietario: string) {
    const copia = new CopiaLibro({
        ISBN: ISBN, locazione: {
            type: 'Point',
            coordinates: [locazione[0], locazione[1]] // long, lat
        }, proprietario: proprietario
    });
    return await copia.save();
}

export async function removeCopiaLibro(ISBN: string, proprietario: string) {
    const res = await CopiaLibro.deleteOne({ ISBN: ISBN, proprietario: proprietario });
    if (res.deletedCount === 0) throw new Error("Copia libro non trovata");
    const copialibro = await CopiaLibro.findOne({ ISBN: ISBN, proprietario: proprietario });
    if (!copialibro) await Libro.deleteOne({ ISBN: ISBN });
}

export async function getLibro(ISBN: string) {
    const res = await Libro.findOne({ ISBN: ISBN });
    if (!res) throw new Error("Libro non trovato");
    return res;
}

export async function getLibriByISBNs(ISBN: string[]) {
    return await Libro.find({ ISBN: { $in: ISBN } });
}

export async function getCopieLibroByUser(user: string) {
    return await CopiaLibro.find({ proprietario: user });
}

export async function getCopieLibro(ISBN: string) {
    return await CopiaLibro.find({ ISBN: ISBN });
}

export async function deleteLibro(ISBN: string) {
    const res = await Libro.deleteOne({ ISBN: ISBN });
    if (res.deletedCount === 0) throw new Error("Libro non trovato");
    return res;
}

export async function deleteCopiaLibro(_id: string) {
    const copia = await CopiaLibro.findOne({ _id: _id });
    if (!copia) return false;
    await CopiaLibro.deleteOne({ _id: _id });
    const copie = await CopiaLibro.findOne({ ISBN: copia.ISBN });
    if (!copie) await Libro.deleteOne({ ISBN: copia.ISBN });
}

export async function checkIfUserHasBook(id: string, proprietario: string) {
    return await CopiaLibro.exists({ _id: id, proprietario: proprietario });
}

export async function checkLibroByID(id: string) {
    return await CopiaLibro.exists({ _id: id });
}

export async function getLibri() {
    return await Libro.find();
}