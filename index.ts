import DB from "./database/db"
import * as dotenv from 'dotenv'

import { addRecensione,addLibro } from "./database/manager/managerLibri"

const envs = dotenv.config()

const db = new DB(envs.parsed.MONGO_LINK, envs.parsed.MONGO_PASS)

addLibro("Il nome della rosa","Umberto Eco","978-8804668237").then((val) => {
    console.log(val)
    addRecensione("978-8804668237", "Il mio commento sulla lettura", 4).then((val) => {
        console.log(val)
    })
})


db.connect().then(async () => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error connecting to MongoDB: " + err)
})
