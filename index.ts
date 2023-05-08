import DB from "./database/db"
import * as dotenv from 'dotenv'

import { Schema, model } from 'mongoose';

const envs = dotenv.config()

const db = new DB(envs.parsed.MONGO_LINK, envs.parsed.MONGO_PASS)


// 1. Create an interface representing a document in MongoDB.
interface IUser {
    name: string;
    email: string;
    avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);



db.connect().then(async () => {
    const user = new User({
        name: 'Bill',
        email: 'bill@initech.com',
        avatar: 'https://i.imgur.com/dM7Thhn.png'
    });
    await user.save();

    console.log(user.email);
}).catch((err) => {
    console.log("Error connecting to MongoDB: " + err)
})


































































































console.log("ti puzza il culo, lavatelo perfavore")