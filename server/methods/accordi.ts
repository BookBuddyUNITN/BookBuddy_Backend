import { addAccordo, deleteAccordo } from "../../database/manager/managerAccordi"

export function creaAccordo(req, res) {
    addAccordo(req.body.userID_1, req.body.userID_2, req.body.data, req.body.libro, req.body.libri_proposti)
        .then((accordo) => {
            res.status(200).json({
                success: true,
                message: "Accordo creato con successo",
                data: {
                    accordo: accordo
                }
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            })
        })
}  

export function eliminaAccordo(req, res) {
    deleteAccordo(req.body.id)
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Accordo eliminato con successo",
                data: {}
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            })
        })
}