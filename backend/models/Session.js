import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const { sessionId } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const session = await Session.findById(sessionId);

    if (session && await bcrypt.compare(refreshToken, session.refreshTokenHash))
        return session;

    return null;
}

const Session = mongoose.model("Session", SessionSchema);
export default Session;
