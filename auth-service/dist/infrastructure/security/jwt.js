"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtTokenService = exports.generateJwtTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtTokenService = (secret) => {
    return {
        generateToken: (user) => {
            return jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            }, secret, {
                expiresIn: "24h",
            });
        },
    };
};
exports.generateJwtTokenService = generateJwtTokenService;
const verifyJwtTokenService = (secret) => {
    return {
        verifyToken: (token) => {
            try {
                return jsonwebtoken_1.default.verify(token, secret);
            }
            catch (error) {
                throw new Error("Token verification failed");
            }
        },
    };
};
exports.verifyJwtTokenService = verifyJwtTokenService;
