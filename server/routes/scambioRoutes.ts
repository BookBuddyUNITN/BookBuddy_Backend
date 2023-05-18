import express from "express"
import { annullaScambio, confermaScambio, proponiScambio } from "../methods/scambio"

const scambioRouter = express.Router()

scambioRouter.post("/gestione", proponiScambio)
scambioRouter.delete("/gestione", annullaScambio)
scambioRouter.post("/accetta", confermaScambio)

export default scambioRouter