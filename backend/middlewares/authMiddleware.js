import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.js";

export function authenticate(req, res, next) {
    const accessToken = req.headers.authorization;
    let accessTokenPayload;


    try {
        accessTokenPayload = accessToken && jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        throw new APIError(error.message, 401, error);
    }

    if (!accessTokenPayload)
        throw new APIError("Access token is invalid", 401, null, "Token Error");

    req.sessionId = accessTokenPayload.sessionId;
    req.userId = accessTokenPayload.userId;
    req.userRole = accessTokenPayload.userRole;

    next();
}

export function authorizeAdmin(req, res, next) {
    if (req.userRole !== "admin")
        throw new APIError("Only admin can access this route", 403, null, "Authorization Error");

    next();
}
