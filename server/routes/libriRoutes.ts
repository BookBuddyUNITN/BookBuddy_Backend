import express from "express"
import { getLibroReq, GetLibriReq, addLibroReq, deleteBook } from "../methods/libro"

const libriRouter = express.Router()

libriRouter.get("/lista" , GetLibriReq )
libriRouter.get("/libro", getLibroReq )
libriRouter.post("/add", addLibroReq )
libriRouter.delete("/cancella", deleteBook )

export default libriRouter
