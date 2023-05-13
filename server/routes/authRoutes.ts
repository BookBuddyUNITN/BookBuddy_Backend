import express from "express"
import { login } from "../methods/auth"

const authRouter = express.Router()

authRouter.post("/login", login )

export default authRouter
