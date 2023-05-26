import express from "express"
import { login, registrazione, confermaUtente } from "../methods/auth"

const authRouter = express.Router()

authRouter.post("/login", login )
authRouter.post("/registrazione", registrazione );
authRouter.get("/validate*", confermaUtente );

export default authRouter

