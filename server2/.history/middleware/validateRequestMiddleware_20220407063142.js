const { validationResult } = require('express-validator');
const ApiError = require("../error/ApiError")

export function validateRequestMiddleware(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        next(ApiError.badFormData(errors.array()))
    }
}