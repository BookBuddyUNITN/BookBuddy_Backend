import express from "express"
import { annullaScambio, proponiScambio } from "../methods/scambio"

const scambioRouter = express.Router()

scambioRouter.post("scambi/gestione", proponiScambio)
scambioRouter.delete("scambi/gestione", annullaScambio)

export default scambioRouter