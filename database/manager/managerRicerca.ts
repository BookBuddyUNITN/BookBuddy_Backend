import { Libro, CopiaLibro, LibroInterface, CopialibroInterface } from "../models/Libro";


export async function search(options: { locazione: [number, number], searchString: string, distanzaMassima: number }) {
    const researchObject = {
        locazione: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: options.locazione
                },
                $maxDistance: options.distanzaMassima
            }
        }
    };

    const locals = await CopiaLibro.find(researchObject) as CopialibroInterface[];

    if (options.searchString === "")
        return locals;

    let books = await Promise.all(locals.map(async (local) => {
        const book = await Libro.findOne({ ISBN: local.ISBN }) as LibroInterface;
        // case insensitive search
        if (book.titolo.toLowerCase().includes(options.searchString.toLowerCase()) || book.autore.toLowerCase().includes(options.searchString.toLowerCase()) || book.ISBN.toLowerCase().includes(options.searchString.toLowerCase())){
            return book;
        }
        return null;
    }));
    books = books.filter(n => n);
    return books;
}


