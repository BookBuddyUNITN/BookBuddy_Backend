import express from "express"
import { login, registrazione, confermaUtente, verificaToken } from "../methods/auth"

const authRouter = express.Router()

authRouter.post("/login", login )
authRouter.post("/registrazione", registrazione );
authRouter.get("/validate", confermaUtente );
authRouter.get("/validatoken", verificaToken );

export default authRouter

