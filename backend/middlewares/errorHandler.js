import logger from "../config/logger.js";
import APIError from "../utils/APIError.js";

export default function errorHandler(error, req, res, next) {
    if (error instanceof APIError) {
        logger.error(error.toString());
        if (error.type === "Validation Error") {
            return res.status(error.status).json({ error });
        }
        return res.status(error.status).json({ error: { name: error.name, message: error.message } });
    } else if (error instanceof Error) {
        logger.error({
            error: error.name,
            message: error.message,
            trace: error.stack,
        });
        return res.status(500).json({ error: "server error" });
    } else {
        logger.error(error);
        return res.status(500).json({ error: "server error" });
    }
}
