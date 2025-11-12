import "dotenv/config";

import logger from "./config/logger.js";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import app from "./app.js";

(async function start() {
    try {
        await connectDB();
        await connectRedis();
        app.listen(process.env.APP_PORT, () => {
            logger.info(`Listening on port ${process.env.APP_PORT}`);
        });
    } catch (error) {
        logger.error("error happened in server.js", error);
    }
})();
