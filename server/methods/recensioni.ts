import { lasciaRecensioneLibro } from "../../database/manager/managerRecensioni";
import { getPayload } from "../../database/manager/managerLogin";

export async function lasciaRecensione(req, res) {
    const body = req.body;
    if (!Object.keys(body).length) throw new Error("bad request");
    if (body.voto as number > 5 || body.voto as number < 0) throw new Error("recensione non valida");
    let decoded = getPayload(req.header('x-access-token'));
    if (!decoded.id) throw new Error("idUtente is required");
    lasciaRecensioneLibro(body.testo, body.voto, decoded.id, body.isbn, decoded.username).then((result) => {
        res.status(201).send({
            success: true,
            message: "Recensione lasciata",
            data: {
                libro: result,
                recensione: {...body, utenteID: decoded.id, username: decoded.username}
            }
        });
    }).catch((e) => {
        res.status(400).send({
            success: false,
            message: e.message
        });
    });

}