import { addAccordo, deleteAccordo, setLibroScelto } from "../../database/manager/managerAccordi"

export function creaAccordo(req, res) {
    addAccordo(req.headers["x-access-token"], req.body.userID_2, req.body.libro, req.body.libri_proposti)
        .then((accordo) => {
            res.status(201).json({
                success: true,
                message: "Accordo creato con successo",
                data: {
                    accordo: accordo
                }
            })
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                message: err,
                data: {}
            })
        })
}

export function eliminaAccordo(req, res) {
    deleteAccordo(req.headers["x-access-token"], req.query.id)
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Accordo eliminato con successo",
                data: {}
            })
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                message: err,
                data: {}
            })
        })
}

export function scegliLibro(req, res) {
    setLibroScelto(req.headers["x-access-token"], req.body.id, req.body.libro_scelto)
        .then(() => {
            res.status(200).json({
                success: true,
                message: "libro scelto con successo",
                data: {}
            })
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                message: err,
                data: {}
            })
        })
}