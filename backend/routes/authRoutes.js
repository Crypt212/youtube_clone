import { Router } from "express";
import { body, query } from "express-validator";

import upload from "../config/multer.js";
import AuthController from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validator.js";

const validationList = {
    username:
        body("username").trim().notEmpty().withMessage("username is required")
            .matches(/^[a-zA-Z0-9\.-_]+$/).withMessage("username can only contain letters, numbers, ., - and _")
            .isLength({ min: 3, max: 20 }).withMessage("username must be between 3 and 20 characters")
            .escape(),
    email:
        body("email").trim().notEmpty().withMessage("email is required")
            .isEmail().withMessage("email must be valid"),
            // .normalizeEmail(),
    password:
        body("password").notEmpty().withMessage("password is required")
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }).withMessage("password must have at least: 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special"),
    confrimPassword:
        body("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("confirm password must match password"),
    firstName:
        body("firstName").trim().notEmpty().withMessage("first name is required")
            .matches(/^[a-zA-Z0-9 ]+$/).withMessage("first name can only contain letters, numbers and spaces")
            .isLength({ min: 3, max: 20 }).withMessage("first name must be between 3 and 20 characters")
            .escape(),
    secondName:
        body("secondName").trim().notEmpty().withMessage("first name is required")
            .matches(/^[a-zA-Z0-9 ]+$/).withMessage("second name can only contain letters, numbers and spaces")
            .isLength({ min: 3, max: 20 }).withMessage("second name must be between 3 and 20 characters")
            .escape(),

    emailVerificationToken:
        query("emailVerificationToken").notEmpty().withMessage("invalid verification token"),

    resetPasswordToken:
        query("resetPasswordToken").notEmpty().withMessage("invalid reset password token")
};

const AuthRouter = Router();

AuthRouter.post("/signup",
    validationList.username,
    validationList.email,
    validationList.password,
    validationList.confrimPassword,
    validationList.firstName,
    validationList.secondName,
    validate,
    upload.single("profilePic"),
    AuthController.signup);

AuthRouter.post("/login",
    validationList.email,
    validationList.password,
    validate,
    AuthController.login);

AuthRouter.post("/logout", AuthController.logout);

AuthRouter.post("/regenerate-access-token", AuthController.regenerateAccessToken);

AuthRouter.post("/verify-email",
    validationList.emailVerificationToken,
    validate,
    AuthController.verifyEmail);

AuthRouter.post("/send-email-verification",
    validationList.email,
    validationList.password,
    validate,
    AuthController.sendEmailVerification);

AuthRouter.post("/forgot-password",
    validationList.email,
    validate,
    AuthController.forgotPassword);

AuthRouter.post("/reset-password",
    validationList.resetPasswordToken,
    validationList.password,
    AuthController.resetPassword);

AuthRouter.get("/get-me", authenticate, AuthController.getMe);

export default AuthRouter;
