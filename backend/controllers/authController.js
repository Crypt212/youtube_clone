import { matchedData } from "express-validator";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import APIError from "../utils/APIError.js";

import jwt from "jsonwebtoken";

export default class AuthController {
    static async signup(req, res) {
        const { username, email, password, firstName, lastName } = matchedData(req, { includeOptionals: true });

        const user = await User.addUser({ username, email, password, firstName, lastName, profilePic: req.file ? req.file.path : null });

        const emailVerificationToken = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: "1h" });

        try {
            sendEmail(process.env.EMAIL_AUTH_EMAIL, email, "Welcome to our app", `http://${process.env.FRONTEND_URI}/verify-email?email=${email}&token=${emailVerificationToken}`);
        } catch (error) {
            throw new APIError("Failed to send email", 500, error);
        }

        res.status(200).json({
            status: "success",
            message: "verify email to complete registration"
        });
    }

    static async login(req, res) {
        const { email, password } = matchedData(req, { includeOptionals: true });
        const refreshTokenDurationMs = 1000 * 60 * 60 * 24 * 7;
        const accessTokenDurationMs = 1000 * 60 * 60;
        const deviceInfo = `${req.ip} - ${req.headers['user-agent']}`;

        const refreshToken = await User.signin(email, password, deviceInfo, refreshTokenDurationMs, accessTokenDurationMs);
        const accessToken = await User.grantAccessToken(refreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: refreshTokenDurationMs,
        });

        res.status(200).json({
            status: "success",
            message: "sign in successful",
            accessToken,
            accessTokenDuration: accessTokenDurationMs
        });
    }

    static async logout(req, res) {
        const refreshToken = req.cookies.refreshToken;

        await User.signout({ refreshToken });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({
            status: "success",
            message: "sign out successful",
        });
    }

    static async regenerateAccessToken(req, res) {

        const { accessToken, durationMs } = await User.grantAccessToken(req.cookies.refreshToken);

        res.status(200).json({
            status: "success",
            message: "access token has been regenerated",
            accessToken,
            accessTokenDuration: durationMs
        });
    }

    static async sendEmailVerification(req, res) {
        const { email, password } = matchedData(req, { includeOptionals: true });

        try {
            await User.authenticateUser(email, password);
        } catch (error) {
            if (error.message !== "Email not verified")
                throw error;
        }

        const emailVerificationToken = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: "1h" });

        try {
            sendEmail(process.env.EMAIL_AUTH_EMAIL, email, "Welcome to our app", `http://${process.env.FRONTEND_URI}/verify-email?email=${email}&token=${emailVerificationToken}`);
        } catch (error) {
            throw new APIError("Failed to send email", 500, error);
        }

        res.status(200).json({
            status: "success",
            message: "verify email to complete registration"
        });
    }

    static async verifyEmail(req, res) {
        const { emailVerificationToken } = matchedData(req, { includeOptionals: true });

        let email
        try {
            email = jwt.verify(emailVerificationToken, process.env.JWT_EMAIL_SECRET).email;
        } catch (error) {
            throw new APIError("Verfication Error", "Invalid or expired verification token", 400, error);
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new APIError("Email not found", "User with this email not found", 400);
        }

        user.verified = true;

        await user.save();

        res.status(200).json({
            status: "success",
            message: "email has been verified successfully",
        });
    }

    static async forgotPassword(req, res) {
        const { email } = matchedData(req, { includeOptionals: true });

        const user = await User.findOne({ email });

        if (!user) {
            throw new APIError("Email not found", "User with this email not found", 400);
        }

        const resetPasswordToken = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: "1h" });
        sendEmail(process.env.EMAIL_AUTH_EMAIL, email, "Reset your password", `http://${process.env.FRONTEND_URI}/reset-password?token=${resetPasswordToken}`);
        res.status(200).json({
            status: "success",
            message: "password reset email has been sent",
        });
    }

    static async resetPassword(req, res) {
        const { resetPasswordToken, newPassword } = matchedData(req, { includeOptionals: true });

        let email;
        try {
            email = jwt.verify(resetPasswordToken, process.env.JWT_EMAIL_SECRET).email;
        } catch (error) {
            throw new APIError("Reset Password Error", error.message, 400, error);
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new APIError("Email not found", "User with this email not found", 400);
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({
            message: "password has been reset successfully",
            status: "success",
        });
    }

    static async getMe(req, res) {
        const user = await User.findById(req.userId).select("-password -profilePic -createdAt").lean();

        res.status(200).json({
            status: "success",
            user
        });
    }
}
