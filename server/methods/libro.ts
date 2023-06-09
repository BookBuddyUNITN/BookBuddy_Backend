import { getLibri, addLibro, addCopiaLibro, deleteLibro, getLibro, addLibroByISBN } from "../../database/manager/managerLibri"
import { getPayload } from "../../database/manager/managerLogin"

interface addLibroInterface {
    titolo: NonNullable<string>,
    autore: NonNullable<string>,
    ISBN: NonNullable<string>
}

interface addCopiaLibroInterfaceCompleta {
    titolo: NonNullable<string>,
    autore: NonNullable<string>,
    generi: NonNullable<string[]>,
    ISBN: NonNullable<string>,
    locazione: [NonNullable<number>, NonNullable<number>],
    proprietario: NonNullable<string>
}

interface addCopiaLibroInterface {
    ISBN: NonNullable<string>,
    locazione: [NonNullable<number>, NonNullable<number>],
    proprietario: NonNullable<string>
}

export async function GetLibriReq(req, res) {
    try {
        res.send({
            success: true,
            message: "Libri trovati",
            data: {
                libri: await getLibri()
            }
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function getLibroReq(req, res) {
    try {
        const result = req.body as { ISBN: NonNullable<string> }
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        res.status(200).send({
            success: true,
            message: "Libro trovato",
            data: {
                libro: await getLibro(result.ISBN)
            }
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}

export async function addLibroReq(req, res) {
    try {
        const result = req.body as addLibroInterface
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        const libro = await addLibro(result.titolo, result.autore, result.ISBN)
        res.status(201).send({
            success: true,
            message: "Libro aggiunto",
            data: {
                libro: libro
            }
        })
    } catch (e) {
        if (e.message.includes("duplicate key error")) {
            res.status(201).send({
                success: true,
                message: "Libro gia presente",
                data: {
                    libro: await getLibro(req.body.ISBN)
                }
            })
        }
        res.status(400).send({
            error: e.message
        })
    }
}

// export async function addCopiaLibroReq(req, res) {
//     try {
//         const result = req.body as { isbn: string };
//         const decoded = getPayload(req.header('x-access-token'));
//         let libro = null;
//         try {
//             libro = await addLibroByISBN(result.isbn);
//         } catch (e) {
//             if (e.message.includes("duplicate key error")) {
//                 try {
//                     libro = await getLibro(result.isbn);
//                 } catch (e) {
//                     throw new Error("Libro non trovato");
//                 }
//             }
//         }
//         if (libro === null) throw new Error("Libro non trovato");
//         const copialibro = await addCopiaLibro(result.isbn, [0,0], decoded.id);
//         res.status(201).send({
//             success: true,
//             message: "Elemento aggiunto alla wishlist",
//             data: { idUtente: decoded.id, isbn: copialibro.ISBN, libro: libro }
//         });
//     } catch (e) {
//         res.status(400).send({
//             error: e.message
//         });
//     };
// }

export async function deleteBookReq(req, res) {
    try {
        const result = req.body as { ISBN: NonNullable<string> }
        if (!Object.keys(result).length) throw new Error("ISBN is required")
        deleteLibro(result.ISBN)
        res.status(200).send({
            success: true,
            message: "Libro eliminato",
            data: {}
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
}