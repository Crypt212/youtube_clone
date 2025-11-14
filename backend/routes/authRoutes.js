import { Router } from "express";
import AuthController from "../controllers/authController";
import { body, header, query } from "express-validator";
import upload from "../config/multer.js";

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

AuthRouter.post("/signin",
    body("email").trim().notEmpty().isEmail().normalizeEmail().withMessage("invalid username"),
    body("password").notEmpty().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("invalid password"),
    AuthController.signin);

AuthRouter.post("/signout", AuthController.signout);

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

export default AuthRouter;
