import { lasciaRecensioneReq, eliminaRecensioneLibroReq, getRecensioniLibroReq } from "../methods/recensioni";
import express from 'express'

export const recensioneRouter = express.Router();

recensioneRouter.post("/", lasciaRecensioneReq);
recensioneRouter.delete("/", eliminaRecensioneLibroReq);
recensioneRouter.get("/", getRecensioniLibroReq);

// recensioneRouter.post("/utenti", lasciaRecensioneUtente);
// recensioneRouter.delete("/utenti", rimuoviRecensioneUtente);
// recensioneRouter.get("/utenti", getRecensioniUtente)
