import { validationResult } from "express-validator";
import APIError from "../utils/APIError.js";

export default function validate(req, res, next) {
    const errors = validationResult(req).array();

    if (errors.length == 0)
        return next();

    const details = [];

    console.log(JSON.stringify(errors, null, 4));
    errors.forEach(error => {
        details.push(
            {
                message: error.msg,
                field: error.path,
                givenValue: error.value
            }
        );
    });

    throw new APIError("Input is invalid", 400, details, "Validation Error");
}
