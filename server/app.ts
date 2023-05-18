import express from "express"
import authRouter from "./routes/authRoutes"
import libriRouter from "./routes/libriRoutes"
import wishlistRoutes from "./routes/wishlistRouters"

import cors from "cors"
import accordoRouter from "./routes/accordoRoutes"

import tokenChecker from "./middleware/tokenChecker"

const app = express()

export default function runServer() {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())


    
    app.use("/auth", authRouter)
    app.use(tokenChecker)
    app.use("/libro", libriRouter)
    app.use("/wishlist", wishlistRoutes)
    app.use("/accordo", accordoRouter)
    
    
    app.listen(3456, () => {
        console.log("Server running on port 3456")
    })
}