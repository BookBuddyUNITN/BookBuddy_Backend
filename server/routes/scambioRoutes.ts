import express from "express"
import { annullaScambio, confermaScambio, proponiScambio, getScambio } from "../methods/scambio"

const scambioRouter = express.Router()

scambioRouter.post("/post", proponiScambio)
scambioRouter.delete("/delete", annullaScambio)
scambioRouter.put("/confirm", confermaScambio)
scambioRouter.get("/get", getScambio)

export default scambioRouter