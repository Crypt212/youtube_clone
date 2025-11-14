import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "./Session";

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    verified: { type: Boolean, default: false },
    firstName: String,
    lastName: String,
    profilePic: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    subscribers: [{ type: ObjectId, ref: "User" }],     // users who subscribed to this user’s channel
    subscriptions: [{ type: ObjectId, ref: "User" }],   // channels this user subscribed to
}, {
    timestamps: true
});

UserSchema.statics.addUser = async function({ username, email, password, firstName, lastName, profilePic }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this({ username, email, password: hashedPassword, firstName, lastName, profilePic });
    await user.save();
    return user;
}

UserSchema.statics.signin = async function(email, password, deviceInfo, refreshTokenDurationMs, accessTokenDurationMs) {
    const user = await this.findOne({ email });

    if (!user) throw new Error("User not found");

    if (!await bcrypt.compare(password, user.password)) throw new Error("invalid password");

    if (!user.verified) throw new Error("Email not verified");

    let session = await Session.findOne({ user: user._id, deviceInfo });
    if (!session || session.expiresAt < new Date()) {

        if (session)
            await session.deleteOne();

        session = new Session({
            user: user._id,
            accessTokenDurationMs,
            deviceInfo,
            expiresAt: new Date(Date.now() + refreshTokenDurationMs)
        });
        const refreshToken = jwt.sign({ userId: user._id, sessionId: session._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: refreshTokenDurationMs / 1000 });
        session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);

        await session.save();

        return refreshToken;
    } else
        return null
}

UserSchema.statics.signout = async function(filter) {
    if (filter.refreshToken) {
        const session = await Session.findByRefreshToken(filter.refreshToken);

        if (session)
            await session.deleteOne();
    } else if (filter.userId) {
        if (filter.deviceInfo)
            await Session.deleteMany({ user: filter.userId, deviceInfo: filter.deviceInfo });
        else
            await Session.deleteMany({ user: filter.userId });
    } else
        return false;

    return true;
}

UserSchema.statics.grantAccessToken = async function(refreshToken) {

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await this.findById(payload.userId);

    if (!user)
        throw new Error("User not found");

    const session = await Session.findByRefreshToken(refreshToken);

    if (!session) {
        throw new Error("Invalid refresh token");
    }

    if (session.expiresAt < new Date()) {
        await session.deleteOne();
        throw new Error("Refresh token expired");
    }

    const accessToken = jwt.sign(
        {
            sessionId: session._id,
            userId: user._id,
            userRole: user.role
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: session.accessTokenDurationMs / 1000 });
    return { accessToken, durationMs: session.accessTokenDurationMs };
}

const User = mongoose.model("User", UserSchema);
export default User;
