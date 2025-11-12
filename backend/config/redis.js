import redis from "redis";
import "dotenv/config";

import logger from "./logger.js";

let redisClient = null;

export async function connectRedis () {
    redisClient = await redis.createClient({ url: process.env.REDIS_URI })
    .on('error', err => logger.error("Redis error occured", err))
    .connect();
    logger.info("Redis connected on " + process.env.REDIS_URI);
}

export default redisClient;
