import express from "express"
import { ricercaLocaleReq } from "../methods/ricerca"

const ricercaRouter = express.Router()

ricercaRouter.post("/locale", ricercaLocaleReq )

export default ricercaRouter
