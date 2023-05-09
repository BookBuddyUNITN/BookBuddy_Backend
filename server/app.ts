import express from "express"
import {getLibri} from "../database/manager/managerLibri"

const app = express()

export default function runServer (){
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.get("/libri", async (req, res) => {
        res.send(await getLibri())
    })

    app.get("/api", (req, res) => {
        res.send("Hello API")
    })

    app.listen(3456, () => {
        console.log("Server running on port 3456")
    })
}