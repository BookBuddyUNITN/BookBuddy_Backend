import express from 'express'
import { inserisciCopiaLibro, rimuoviCopiaLibro } from '../methods/libreriaPersonale'

const libreriaPersonaleRouter = express.Router()

libreriaPersonaleRouter.post("/", inserisciCopiaLibro)
libreriaPersonaleRouter.delete("/", rimuoviCopiaLibro)

export default libreriaPersonaleRouter