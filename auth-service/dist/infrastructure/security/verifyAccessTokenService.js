"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Service to verify access tokens
const verifyAccessToken = (ACCESS_TOKEN_PRIVATE_KEY) => {
    return (accessToken) => {
        try {
            // Verify the access token using the private key
            const verified = jsonwebtoken_1.default.verify(accessToken, ACCESS_TOKEN_PRIVATE_KEY);
            return verified;
        }
        catch (error) {
            // Handle any errors that occur during token verification
            console.error("Access token verification failed:", error);
            throw new Error("Access token verification failed");
        }
    };
};
exports.verifyAccessToken = verifyAccessToken;
