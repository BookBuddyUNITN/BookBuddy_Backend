import { lasciaRecensione } from "../methods/recensioni";
import express from 'express'

export const recensioneRouter = express.Router();

recensioneRouter.post("/libri", lasciaRecensione);
// recensioneRouter.delete("/libri", eliminaRecensioneLibro);
// recensioneRouter.get("/libri", getRecensioniLibro);

// recensioneRouter.post("/utenti", lasciaRecensioneUtente);
// recensioneRouter.delete("/utenti", rimuoviRecensioneUtente);
// recensioneRouter.get("/utenti", getRecensioniUtente)
