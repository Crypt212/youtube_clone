import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: ObjectId,
    username: String,
    email: String,
    password: String,
    name: String,
    profilePic: String,
    role: "user" | "admin",
    subscribers: [{ type: ObjectId, ref: "User" }],     // users who subscribed to this user’s channel
    subscriptions: [{ type: ObjectId, ref: "User" }],   // channels this user subscribed to
    createdAt: Date,
    updatedAt: Date,

    refreshTokens: [{
        token: String,
        accessTokenDuration: Number,
        deviceInfo: String,
        createdAt: Date,
        expiresAt: Date,
    }],
});

const User = mongoose.model("User", UserSchema);
export default User;
