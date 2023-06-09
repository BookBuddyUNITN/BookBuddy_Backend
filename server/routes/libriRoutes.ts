import express from "express"
import { getLibroReq, GetLibriReq, deleteBookReq } from "../methods/libro"

const libriRouter = express.Router()

libriRouter.get("/lista" , GetLibriReq )
libriRouter.get("/libro", getLibroReq )
libriRouter.delete("/cancella", deleteBookReq )

export default libriRouter
