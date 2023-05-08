import mongoose from 'mongoose';

export default class DB {
    db_link = null;
    constructor(username: string, password: string, mongo_link : string) {
        this.db_link = "mongodb+srv://" + username + ":" + password + "@" + mongo_link;
    }
    async connect() {
        await mongoose.connect(this.db_link);
    }
}