import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";

import logger from "./config/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middlewares -------------------------------
//

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

const whitelist = [
    process.env.FRONTEND_URI,
];

const corsConfig = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            logger.error("Not allowed by CORS");
            callback(new Error("Not allowed by CORS"));
        }
    }
}

app.use(rateLimiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// -------------------------------------------

// API Routes --------------------------------
//

const apiRouter = express.Router();



app.use('/api', apiRouter);

// -------------------------------------------

// URL Not Found -----------------------------
//

app.use((req, res, next) => {
    res.status(404).send("URL not found");
});

// -------------------------------------------

// HTTP Error Handlers -----------------------
//

app.use(errorHandler);

// -------------------------------------------

export default app;
