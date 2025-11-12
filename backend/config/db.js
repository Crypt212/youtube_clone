import mongoose from "mongoose";
import "dotenv/config";

import logger from "./logger.js";

export async function connectDB () {
    const mongooseClient = await mongoose.connect(process.env.MONGODB_URI);
    logger.info("DB connected on " + process.env.MONGODB_URI);
    return mongooseClient;
}
