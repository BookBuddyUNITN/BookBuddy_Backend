import express from "express"
import authRouter from "./routes/authRoutes"
import libriRouter from "./routes/libriRoutes"
import cors from "cors"
import tokenChecker from "./middleware/tokenChecker"
import scambioRoutes from "./routes/scambioRoutes"
import libreriaPersonaleRouter from "./routes/libreriaPersonaleRoutes"
import wishlistRoutes from "./routes/wishlistRouters"


const app = express()



//TODO: fixare l'error che deve dare in caso arrivi null dal req.body



export default function runServer() {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())


    
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use("/auth", authRouter)
    //app.use(tokenChecker)
    app.use("/libro", libriRouter)
    app.use("/wishlist", wishlistRoutes)

    app.use("/scambi", scambioRoutes);
    app.use("/libreriaPersonale", libreriaPersonaleRouter)
    
    
    app.listen(3456, () => {
        console.log("Server running on port 3456")
    })
}