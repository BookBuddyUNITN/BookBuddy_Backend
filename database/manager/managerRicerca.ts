import { Libro, CopiaLibro, CopialibroInterface } from "../models/Libro";


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

    const final = Libro.find({
        "ISBN": {
            "$in": locals.map(function (el) {
                return el.ISBN;
            })
        }
    });
    return await final.then((books) => {
        let found = [];
        if (options.rating){
            for (let i = 0; i < books.length; i++) {
                // compute average rating for every book
                const book = books[i];
                let sum = 0;
                if (book.recensioni.length == 0)
                    continue;
                for (let j = 0; j < book.recensioni.length; j++) {
                    sum += book.recensioni[j].voto;
                }
                const avg = sum / book.recensioni.length;
                // if average rating is in range, add book to found
                if (avg >= options.rating[0] && avg <= options.rating[1]) {
                    found.push(book);
                }
                
            }
        } else {
            found = books;
        }
        if (found.length == 0)
            return [];
        let found2 = [];
        if (!(options.searchString == "")) {
            for (let i = 0; i < found.length; i++) {
                const book = found[i];
                if (book.titolo.toLowerCase().includes(options.searchString.toLowerCase()) || book.autore.toLowerCase().includes(options.searchString.toLowerCase()) || book.ISBN.toLowerCase().includes(options.searchString.toLowerCase())) {
                    found2.push(book);
                }
            }
        } else {
            found2 = found;
        }
        // sorting instructions:
        // 0: sort by distance
        // 1: sort by rating
        // 2: sort by title
        // 3: sort by distance reversed
        // 4: sort by rating reversed
        // 5: sort by title reversed
        if (options.ordinamento === 0 || options.ordinamento === 1 || options.ordinamento === 2 || options.ordinamento === 3 || options.ordinamento === 4 || options.ordinamento === 5)
            found2 = sortBy(found2, options.ordinamento);
        return found2;
    }).catch((err) => {
        console.log(err);
        return [];
    });



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


