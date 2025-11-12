import winston from "winston";
import "dotenv/config";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.colorize(),
    ),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "log/info.log", level: "info" }),
        new winston.transports.File({ filename: "log/error.log", level: "error" })
    ]
});

export default logger;
