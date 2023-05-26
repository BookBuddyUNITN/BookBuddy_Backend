import { search } from "../../database/manager/managerRicerca";

interface ricercaInterface {
    locazione: [NonNullable<number>, NonNullable<number>],
    distanzaMassima: NonNullable<number>,
    searchString: NonNullable<string>,
    generi: string[],
    rating: [number, number],
    ordinamento: number
}

export async function ricercaLocaleReq(req, res) {
    try {
        const result = req.body as ricercaInterface;
        if (!Object.keys(result).length) throw new Error("Errore parametri per ricerca");
        const ricerca = search(result);
        ricerca.then((result) => {
            console.log("risultato ricerca", result);
            res.status(200).send({
                success: true,
                message: "Ricerca effettuata con successo",
                data: { result: result }
            })
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            message: err.message
        })
    }
}
