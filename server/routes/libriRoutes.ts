import express from "express"
import { getLibroReq, GetLibriReq, addCopiaLibroReq, deleteBookReq } from "../methods/libro"

const libriRouter = express.Router()

libriRouter.get("/lista" , GetLibriReq )
libriRouter.get("/libro", getLibroReq )
libriRouter.post("/add", addCopiaLibroReq )
libriRouter.delete("/cancella", deleteBookReq )

export default libriRouter
