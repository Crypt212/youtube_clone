import { matchedData } from "express-validator";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

export default class AuthController {
    static async signup(req, res) {
        const { username, email, password, firstName, lastName } = matchedData(req, { includeOptionals: true });

        const user = await User.addUser({ username, email, password, firstName, lastName });

        const profilePic = req.file ? req.file.path : null;

        const refreshTokenDurationMs = 1000 * 60 * 60 * 24 * 7;
        const accessTokenDurationMs = 1000 * 60 * 60;
        const deviceInfo = `${req.ip}-${req.headers['user-agent']}`;

        const emailVerificationToken = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: "1h" });
        sendEmail(process.env.EMAIL_AUTH_EMAIL, email, "Welcome to our app", `http://${process.env.FRONTEND_URI}/verify-email?email=${email}&token=${emailVerificationToken}`);

        // const refreshToken = await User.signin(email, password, deviceInfo, refreshTokenDurationMs, accessTokenDurationMs);
        // const { accessToken } = await User.grantAccessToken(refreshToken);
        //
        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "none",
        //     maxAge: refreshTokenDurationMs * 1000,
        // });


        res.status(200).json({
            status: "success",
            accessToken,
            accessTokenDuration: accessTokenDurationMs * 1000
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
        });
    }

    static async regenerateAccessToken(req, res) {

        const { accessToken, durationMs } = await User.grantAccessToken(req.cookies.refreshToken);

        res.status(200).json({
            status: "success",
            accessToken,
            accessTokenDuration: durationMs
        });
    }

    static async verifyEmail(req, res) {
        const { verficationToken } = matchedData(req, { includeOptionals: true });

        let email
        try {
            email = jwt.verify(verficationToken, process.env.JWT_EMAIL_SECRET).email;
        } catch (error) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        const user = await User.findOne({ email });

        user.verified = true;

        await user.save();

        res.status(200).json({
            status: "success",
        });
    }

    static async forgotPassword(req, res) {
        const { email } = matchedData(req, { includeOptionals: true });

        const user = await User.findOne({ email });

        if (user) {
            const resetPasswordToken = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: "1h" });
            sendEmail(process.env.EMAIL_AUTH_EMAIL, email, "Reset your password", `http://${process.env.FRONTEND_URI}/reset-password?token=${resetPasswordToken}`);
            res.status(200).json({
                status: "success",
            });
        }
    }

    static async resetPassword(req, res) {
        const { resetPasswordToken, newPassword } = matchedData(req, { includeOptionals: true });

        let email;
        try {
            email = jwt.verify(resetPasswordToken, process.env.JWT_EMAIL_SECRET).email;
        } catch (error) {
            return res.status(400).json({ message: "Invalid or expired reset password token" });
        }

        const user = await User.findOne({ email });

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({
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
