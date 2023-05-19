import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    long: Number,
    lat: Number
})

export interface locationInterface {
    long: Number,
    lat: Number
}

export default locationSchema