import { Router } from "express";
import AuthController from "../controllers/authController";
import { body, header, query } from "express-validator";
import upload from "../config/multer.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const AuthRouter = Router();

AuthRouter.post("/signup",
    body("username")
        .trim().notEmpty().matches(/^[a-zA-Z0-9\.-_]+$/).isLength({ min: 3, max: 20 }).escape().withMessage("invalid username"),
    body("email").trim().notEmpty().isEmail().normalizeEmail().withMessage("invalid username"),
    body("password").notEmpty().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("invalid password"),
    body("passwordConfirm").custom((value, { req }) => value === req.body.password).withMessage("passwords do not match"),
    body("firstName").trim().notEmpty().matches(/^[a-zA-Z0-9 ]+$/).escape().isLength({ min: 3, max: 20 }).withMessage("invalid first name"),
    body("lastName").trim().notEmpty().matches(/^[a-zA-Z0-9 ]+$/).escape().isLength({ min: 3, max: 20 }).withMessage("invalid last name"),
    upload.single("profilePic"),
    AuthController.signup);

AuthRouter.post("/login",
    body("email").trim().notEmpty().isEmail().normalizeEmail().withMessage("invalid username"),
    body("password").notEmpty().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("invalid password"),
    AuthController.login);

AuthRouter.post("/logout", AuthController.logout);

AuthRouter.post("/regenerate-access-token", AuthController.regenerateAccessToken);


AuthRouter.post("/verify-email",
    body("verficationToken").notEmpty().withMessage("invalid token"),
    AuthController.verifyEmail);

AuthRouter.post("/forgot-password",
    body("email").trim().notEmpty().isEmail().normalizeEmail().withMessage("invalid username"),
    AuthController.forgotPassword);

AuthRouter.post("/reset-password",
    body("resetPasswordToken").notEmpty().withMessage("invalid token"),
    body("password").notEmpty().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("invalid password"),
    AuthController.resetPassword);

AuthRouter.get("/get-me", authenticate(), AuthController.getMe);

export default AuthRouter;
