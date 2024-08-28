"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        console.log(req.user);
        if (!req.user || req.user.role !== requiredRole) {
            return res
                .status(403)
                .json({ message: "Access Denied. Insufficient permissions." });
        }
        next();
    };
};
exports.default = roleMiddleware;
