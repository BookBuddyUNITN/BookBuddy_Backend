import express from "express"
import { getLibroReq, GetLibriReq, addCopiaLibroReq, addLibroReq, deleteBook } from "../methods/libro"

const libriRouter = express.Router()

libriRouter.get("/lista" , GetLibriReq )
libriRouter.get("/libro", getLibroReq )
libriRouter.post("/add", addLibroReq )
libriRouter.post("/addcp", addCopiaLibroReq )
libriRouter.delete("/cancella", deleteBook )

export default libriRouter
