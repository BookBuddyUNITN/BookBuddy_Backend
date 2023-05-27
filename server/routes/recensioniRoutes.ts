import { lasciaRecensioneLibro, eliminaRecensioneLibro, lasciaRecensioneUtente, rimuoviRecensioneUtente } from "../methods/recensioni";
import express from 'express'

export const recensioneRouter = express.Router();

recensioneRouter.post("/libri", lasciaRecensioneLibro);
recensioneRouter.delete("/libri", eliminaRecensioneLibro);

recensioneRouter.post("/utenti", lasciaRecensioneUtente);
recensioneRouter.delete("/utenti", rimuoviRecensioneUtente);

