import express from "express"
import { creaAccordo, eliminaAccordo } from "../methods/accordi"

const accordoRouter = express.Router()

accordoRouter.post("/crea", creaAccordo )
accordoRouter.delete("/elimina", eliminaAccordo )

export default accordoRouter
