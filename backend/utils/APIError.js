import jwt from "jsonwebtoken";

export default class APIError extends Error {
    constructor(message, status, details, type) {
        super(message);
        this.status = status;
        this.type = "Error";
        if (type) this.type = type;

        if (details instanceof Error)
            this.details = APIError.extractDetails(details);
        else this.details = details;
    }

    toString() {
        return `Error:\n` +
            `Type: ${this.type}\n` +
            `Message: ${this.message}\n` +
            `Status: ${this.status}\n` +
            `Details: ${JSON.stringify(this.details, null, 4)}\n`;
    }

    toBrief() {
        return `Error:\n` +
            `Type: ${this.type}\n` +
            `Message: ${this.message}\n` +
            `Status: ${this.status}\n`;
    }

    static extractDetails(error) {
        const details = [];

        if (error instanceof jwt.TokenExpiredError) {
            details.push({
                stack: error.stack,
                inner: error.inner,
                expiredAt: error.expiredAt,
            });
            this.type = "TokenExpiredError";
        } else if (error instanceof jwt.JsonWebTokenError) {
            details.push({
                stack: error.stack,
                inner: error.inner,
            });
            this.type = "JsonWebTokenError";
        } else if (error instanceof Error) {
            details.push({
                stack: error.stack,
            });
            this.type = "Error";
        }

        return details;
    }
}
