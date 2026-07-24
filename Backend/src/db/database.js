
import 'dotenv/config'
import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    } catch (error){
        console.log("mongodb connection error: ", error)
    }
}

export default connectDB;