"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const user = res.locals.user;
        if (!user || user.role !== requiredRole) {
            return res
                .status(403)
                .json({ message: "Access Denied. Insufficient permissions." });
        }
        next();
    };
};
exports.default = roleMiddleware;
