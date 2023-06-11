import DB from "./database/db"

import app from "./server/app"

require('dotenv').config();

const db = new DB(process.env.MONGO_LINK, process.env.MONGO_PASS)

//PER AVVIARE USARE -> npm run start:nodemon

Promise.all([db.connect()]).then(async () => {
    app.listen(process.env.PORT, () => {
        console.log("Server running on port " + process.env.PORT + "...")
    })
}).catch((err) => {
    console.log("Error: " + err)
    return
})
