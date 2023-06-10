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
        if (!result.locazione ||
            !result.distanzaMassima ||
            (result.searchString !== "" && !result.searchString) ||
            result.distanzaMassima[0] < -180 ||
            result.distanzaMassima[0] > 180 ||
            result.distanzaMassima[1] < -90 ||
            result.distanzaMassima[1] > 90) throw new Error("Errore parametri per ricerca");

        result.locazione = [result.locazione[0], result.locazione[1]] as [NonNullable<number>, NonNullable<number>];
        const ricerca = search(result);
        ricerca.then((result) => {
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
