import { Libro, CopiaLibro, CopialibroInterface } from "../models/Libro";
import { listaGeneri } from "../models/Libro";


function sortBy(found, ordinamento) {
    if (ordinamento == 0)   // distanza
        return found;
    if (ordinamento == 1)   // rating
        return found.sort((a, b) => b.rating - a.rating);
    if (ordinamento == 2)   // titolo
        return found.sort((a, b) => a.titolo.localeCompare(b.titolo));
    if (ordinamento == 3)   // distanza reversed
        return found.reverse();
    if (ordinamento == 4)   // rating reversed
        return found.sort((a, b) => a.rating - b.rating);
    if (ordinamento == 5)   // titolo reversed
        return found.sort((a, b) => b.titolo.localeCompare(a.titolo));
}


export async function search(options: { locazione: [number, number], searchString: string, distanzaMassima: number, generi?: string[], rating?: [number, number], ordinamento?: number }) {
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
    if (!locals.length) return [];
    if (!options.generi) options.generi = listaGeneri;
    if (!options.rating) options.rating = [0, 5];

    const final = Libro.find({
        "ISBN": {
            "$in": locals.map(function (el) {
                return el.ISBN;
            })
        },
        "rating": {
            "$gte": options.rating[0],
            "$lte": options.rating[1]
        },
        "generi": {
            "$in": options.generi
        }
    }).then((books) => {
        let found = [];
        if (!(options.searchString == "")) {
            for (let i = 0; i < books.length; i++) {
                const book = books[i];
                if (book.titolo.toLowerCase().includes(options.searchString.toLowerCase()) || book.autore.toLowerCase().includes(options.searchString.toLowerCase()) || book.ISBN.toLowerCase().includes(options.searchString.toLowerCase())) {
                    found.push(book);
                }
            }
        } else {
            found = books;
        }
        // sorting instructions:
        // 0: sort by distance
        // 1: sort by rating
        // 2: sort by title
        // 3: sort by distance reversed
        // 4: sort by rating reversed
        // 5: sort by title reversed
        if (options.ordinamento === 0 || options.ordinamento === 1 || options.ordinamento === 2 || options.ordinamento === 3 || options.ordinamento === 4 || options.ordinamento === 5)
            found = sortBy(found, options.ordinamento);
        return found;
    }).catch((err) => {
        console.log(err);
        return [];
    });

    return await final;

    // let books = await Promise.all(locals.map(async (local) => {
    //     const book = await Libro.findOne({ ISBN: local.ISBN }) as LibroInterface;
    //     // case insensitive search
    //     if (book.titolo.toLowerCase().includes(options.searchString.toLowerCase()) || book.autore.toLowerCase().includes(options.searchString.toLowerCase()) || book.ISBN.toLowerCase().includes(options.searchString.toLowerCase())) {
    //         return book;
    //     }
    //     return null;
    // }));
    // books = books.filter(n => n);
    // return books;
}


