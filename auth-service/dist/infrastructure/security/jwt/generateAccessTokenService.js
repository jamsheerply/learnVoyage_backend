"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to generate access tokens, accepts access token private key as an argument
const generateAccessTokenService = (ACCESS_TOKEN_PRIVATE_KEY) => {
    return {
        // Method to generate an access token
        generateToken: (user) => {
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                firstName: user.firstName,
            };
            return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
                expiresIn: "30d",
            });
        },
    };
};
exports.generateAccessTokenService = generateAccessTokenService;
