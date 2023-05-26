import express from "express"
import { creaAccordo, eliminaAccordo, scegliLibro } from "../methods/accordi"

const accordoRouter = express.Router()

accordoRouter.put("/crea", creaAccordo )
accordoRouter.delete("/elimina", eliminaAccordo )
accordoRouter.post("/scegli", scegliLibro)


export default accordoRouter
