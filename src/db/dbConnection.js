import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("DATABASE CONNECTED SUCCESSFULLY! ",connection.connection.host);
        
    } catch (error) {
        console.log("DATABASE FAILED TO CONNECT", error?.message);
        process.exit(1)
    }
}

export { connectDb }