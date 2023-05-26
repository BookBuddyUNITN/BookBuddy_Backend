import { Libro, CopiaLibro, LibroInterface, recensione, CopialibroInterface, libro, listaGeneri } from "../models/Libro";

export async function addLibro(titolo: string, autore: string, ISBN: string, generi: string[] = []) {
    let findGenere = [];
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

export async function addRecensione(ISBN: string, testo: string, voto: number) {
    const libro = await Libro.findOne({ ISBN: ISBN });
    if (!libro) return false;
    if (voto < 0) voto = 0;
    if (voto > 5) voto = 5;
    libro.recensioni.push(new recensione(testo, voto));
    let rating = 0;
    libro.recensioni.forEach(recensione => {
        rating += recensione.voto;
    });
    libro.rating = rating / libro.recensioni.length;
    await libro.save();
    return true;
}

export async function addCopiaLibro(titolo: string, autore: string, ISBN: string, generi: string[], locazione: [number, number], proprietario: string) {
    const libroDocument = await Libro.findOne({ ISBN: ISBN });
    if (!libroDocument) {
        addLibro(titolo, autore, ISBN, generi)
    }
    const copia = new CopiaLibro({
        ISNB: ISBN, locazione: {
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
    return Libro.findOne({ ISBN: ISBN }, (err: any, libro: libro) => {
        if (err) return false;
        return libro;
    })
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