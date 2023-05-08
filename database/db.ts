import mongoose from 'mongoose';

export default class DB {
    db_link = null;
    constructor(username: string, password: string) {
        this.db_link = "mongodb+srv://" + username + ":" + password + "@bookbuddy.lcnowqs.mongodb.net/?retryWrites=true&w=majority";
    }
    async connect() {
        await mongoose.connect(this.db_link);
    }
}