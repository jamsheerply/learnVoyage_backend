"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../infrastructure/security/jwt");
const authMiddleware = (secret) => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "Access Denied. No token provided." });
        }
        try {
            const verifyService = (0, jwt_1.verifyJwtTokenService)(secret);
            const decoded = verifyService.verifyToken(token);
            res.locals.user = decoded;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid token." });
        }
    };
};
exports.default = authMiddleware;
