import express from "express"
import { ricercaLocaleReq } from "../methods/ricerca"
import { ricercaGlobaleReq } from "../methods/ricercaGlobale"

const ricercaRouter = express.Router()

ricercaRouter.post("/locale", ricercaLocaleReq )
ricercaRouter.post("/globale", ricercaGlobaleReq )

export default ricercaRouter
