import { Libro } from "../../database/models/Libro";

export async function lasciaRecensioneLibro(testo: string, voto: number, utenteID: string, ISBN: string, username: string) {
    const libro = await Libro.findOne({ ISBN: ISBN });
    libro.recensioni.push({ testo: testo, voto: voto, utenteID: utenteID, username: username });
    return await libro.save();
}