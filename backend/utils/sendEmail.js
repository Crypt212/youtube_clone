import nodemailer from "nodemailer";
import "dotenv/config";

import logger from "../config/logger.js";

export async function sendEmail(from, to, subject, text) {
    logger.info({from, to, subject, text});
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_AUTH_EMAIL,
            pass: process.env.EMAIL_AUTH_PASS,
        }
    });

    let info = await transporter.sendMail({ from, to, subject, text });

    logger.info(info.messageId);
    logger.info(info.response);
}
