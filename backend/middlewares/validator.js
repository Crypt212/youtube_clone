import { validationResult } from "express-validator";
import logger from "../config/logger";

export default function validator (req, res, next) {
    const errors = validationResult(req).array;

    if (errors.length == 0)
        return next();

    throw new AggregateError(errors);
}
