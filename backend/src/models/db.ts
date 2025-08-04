import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables.");
}

export default async function connectDB() {
    try{
        // @ts-ignore
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB...");
    } catch(err) {
        console.error("❌ Failed to connect to MongoDB:", err);
    }
}

module.exports = connectDB;