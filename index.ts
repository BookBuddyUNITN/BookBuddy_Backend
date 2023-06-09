import DB from "./database/db"
import * as dotenv from 'dotenv'

import {runServer} from "./server/app"

const envs = dotenv.config()

const db = new DB(envs.parsed.MONGO_LINK, envs.parsed.MONGO_PASS)

//PER AVVIARE USARE -> npm run start:nodemon

Promise.all([db.connect()]).then(async () => {
    runServer();
}).catch((err) => {
    console.log("Error: " + err)
    return
})
