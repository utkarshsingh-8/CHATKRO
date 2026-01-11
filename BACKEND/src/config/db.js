import mongoose from "mongoose";
import { env } from "../config/env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(env.mongo_uri);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;