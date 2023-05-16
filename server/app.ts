import express from "express"
import jwt from "jsonwebtoken"
import authRouter from "./routes/authRoutes"
import libriRouter from "./routes/libriRoutes"
import wishlistRoutes from "./routes/wishlistRouters"

import tokenChecker from "./middleware/tokenChecker"

const app = express()



//TODO: fixare l'error che deve dare in caso arrivi null dal req.body



export default function runServer() {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use("/auth", authRouter)
    app.use(tokenChecker)
    app.use("/libro", libriRouter)
    app.use("/wishlist", wishlistRoutes)
    
    
    app.listen(3456, () => {
        console.log("Server running on port 3456")
    })
}