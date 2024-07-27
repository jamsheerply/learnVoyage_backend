"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 400;
    return res.status(statusCode).json({
        success: false,
        status: error.statusCode,
        message: error.message || "Something went wrong",
    });
};
exports.default = errorHandler;
