import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.js";

const SessionSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: "User" },

    refreshTokenHash: String,
    deviceInfo: String,
    accessTokenDurationMs: { type: Number, default: 3600 * 1000 }, // in milliseconds
    expiresAt: Date,        // in milliseconds
}, {
    timestamps: true,
});

SessionSchema.index({ user: 1, deviceInfo: 1 });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

SessionSchema.statics.findByRefreshToken = async function(refreshToken) {
    let sessionId;
    try {
        sessionId = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET).sessionId;
    } catch (error) {
        throw new APIError(error.message, 400, error);
    }
    const session = await Session.findById(sessionId);

    if (session && (await bcrypt.compare(refreshToken, session.refreshTokenHash)))
        return session;

    throw new APIError("Refresh token is invalid", 400, null, "Token Error");
}

const Session = mongoose.model("Session", SessionSchema);
export default Session;
