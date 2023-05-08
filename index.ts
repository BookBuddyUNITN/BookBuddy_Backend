import DB from "./database/db"
import * as dotenv from 'dotenv'

import { Schema, model } from 'mongoose';

const envs = dotenv.config()

const db = new DB(envs.parsed.MONGO_LINK, envs.parsed.MONGO_PASS)

db.connect().then(async () => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error connecting to MongoDB: " + err)
})
