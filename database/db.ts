import { MongoClient, ServerApiVersion } from 'mongodb';

import mongoose from 'mongoose';

export default class DB {
    client = null;
    constructor(username : string, password : string) {
        const uri = "mongodb+srv://" + username + ":" + password + "@bookbuddy.lcnowqs.mongodb.net/?retryWrites=true&w=majority";
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    async run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }
}