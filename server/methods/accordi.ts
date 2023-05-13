import { addAccordo, deleteAccordo } from "../../database/manager/managerAccordi"

export function creaAccordo(req, res) {
    addAccordo(req.body.userID_1, req.body.userID_2, req.body.data, req.body.libro)
        .then((accordo) => {
            res.status(200).json(accordo)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}  

export function eliminaAccordo(req, res) {
    deleteAccordo(req.body.id)
        .then((accordo) => {
            res.status(200).json(accordo)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}