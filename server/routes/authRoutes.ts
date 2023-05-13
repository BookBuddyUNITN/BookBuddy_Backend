import express from "express"
import { registrazione, confermaUtente } from "../methods/auth"

const authRouter = express.Router()

authRouter.post("/registrazione", registrazione );
authRouter.post("/validate", confermaUtente );

export default authRouter

