import mongoose from "mongoose";

export interface userTokenInterface {
    username: string,
    token: string
}

const schema = new mongoose.Schema({
    username: String,
    token: String
})

const userTokens = mongoose.model("userTokens", schema);

export default userTokens