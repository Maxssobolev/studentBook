"use strict";
const { validationResult } = require('express-validator');
const ApiError = require("../error/ApiError");
module.exports = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(ApiError.badFormData(errors.array()));
    }
    next();
};
//# sourceMappingURL=validateRequestMiddleware.js.map