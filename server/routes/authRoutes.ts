import express from "express"
import { login, registrazione, confermaUtente, verificaToken, cambiaPw, mandaTokenCambioPw } from "../methods/auth"

const authRouter = express.Router()

authRouter.post("/login", login )
authRouter.post("/registrazione", registrazione );
authRouter.get("/validate", confermaUtente );
authRouter.get("/validatoken", verificaToken );
authRouter.post("/cambiopw", mandaTokenCambioPw);
authRouter.put("/cambiopw", cambiaPw);

export default authRouter

