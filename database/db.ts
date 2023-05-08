import { MongoClient, ServerApiVersion } from 'mongodb';

import mongoose from 'mongoose';

export default class DB {
    db_link = null;
    constructor(username : string, password : string) {
        this.db_link = "mongodb+srv://" + username + ":" + password + "@bookbuddy.lcnowqs.mongodb.net/?retryWrites=true&w=majority";
    }
    async run() {
        try {
            await mongoose.connect(this.db_link);
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            await mongoose.connection.close();
            console.log("Closed connection to MongoDB.");
        }
    }
}