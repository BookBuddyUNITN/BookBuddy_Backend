import mongoose from 'mongoose';

export default class DB {
    db_link = null;
    constructor(mongo_link : string, password : string) {
        this.db_link = mongo_link.replace("<password>", password)
    }
    async connect() {
        await mongoose.connect(this.db_link);
    }
}
