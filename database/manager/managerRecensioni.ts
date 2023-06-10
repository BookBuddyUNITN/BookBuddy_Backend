import { Libro } from "../../database/models/Libro";

export async function lasciaRecensioneLibro(testo: string, voto: number, utenteID: string, ISBN: string, username: string) {
    const libro = await Libro.findOne({ ISBN: ISBN });
    if (!libro) throw new Error("Libro non trovato");
    libro.recensioni.push({ testo: testo, voto: voto, utenteID: utenteID, username: username });
    return await libro.save();
}

export async function eliminaRecensioneLibro(ISBN: string, recensioneID: string) {
    const libro = await Libro.deleteOne({ ISBN: ISBN, "recensioni._id": recensioneID });
    if (libro.deletedCount === 0) throw new Error("Recensione non trovata");
    return libro;
}

export async function getRecensioniLibro(ISBN: string) {
    const recensioni = await Libro.find({ ISBN: ISBN });
    if (!recensioni.length) throw new Error("Recensioni non trovate");
    return recensioni;
}