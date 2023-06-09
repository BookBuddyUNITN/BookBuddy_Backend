import express from 'express'
import { inserisciCopiaLibro, rimuoviCopiaLibro, getLibri } from '../methods/libreriaPersonale'

const libreriaPersonaleRouter = express.Router()

libreriaPersonaleRouter.get("/list", getLibri)
libreriaPersonaleRouter.post("/", inserisciCopiaLibro)
libreriaPersonaleRouter.delete("/", rimuoviCopiaLibro)

export default libreriaPersonaleRouter