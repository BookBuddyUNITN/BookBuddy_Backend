import { lasciaRecensioneLibro, eliminaRecensioneLibro, lasciaRecensioneUtente, rimuoviRecensioneUtente, getRecensioniLibro, getRecensioniUtente } from "../methods/recensioni";
import express from 'express'

export const recensioneRouter = express.Router();

recensioneRouter.post("/libri", lasciaRecensioneLibro);
recensioneRouter.delete("/libri", eliminaRecensioneLibro);
recensioneRouter.get("/libri", getRecensioniLibro);

recensioneRouter.post("/utenti", lasciaRecensioneUtente);
recensioneRouter.delete("/utenti", rimuoviRecensioneUtente);
recensioneRouter.get("/utenti", getRecensioniUtente)
