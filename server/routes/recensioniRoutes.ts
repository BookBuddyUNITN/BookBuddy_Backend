import { lasciaRecensioneReq, eliminaRecensioneLibroReq, getRecensioniLibroReq } from "../methods/recensioni";
import express from 'express'

export const recensioneRouter = express.Router();

recensioneRouter.post("/post", lasciaRecensioneReq);
recensioneRouter.delete("/delete", eliminaRecensioneLibroReq);
recensioneRouter.get("/get", getRecensioniLibroReq);

// recensioneRouter.post("/utenti", lasciaRecensioneUtente);
// recensioneRouter.delete("/utenti", rimuoviRecensioneUtente);
// recensioneRouter.get("/utenti", getRecensioniUtente)
