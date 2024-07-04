"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
// Convert jwtDecode to a function with a generic type through 'unknown'
const jwtDecodeFunction = jwt_decode_1.default;
// Service to verify refresh tokens
const verifyRefreshToken = (tokenRepository, REFRESH_TOKEN_PRIVATE_KEY) => {
    return (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Use jwtDecodeFunction with the correct typing
            const decoded = jwtDecodeFunction(refreshToken);
            // Convert ObjectId to string
            const userIdString = decoded.userId.toString();
            // Fetch the token data from the repository using the user ID
            const tokenData = yield tokenRepository.getTokenByUserId(userIdString);
            // If no token data is found, throw an error
            if (!tokenData) {
                throw new Error("Token not found in repository");
            }
            // Verify the refresh token using the private key
            const verified = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_PRIVATE_KEY);
            // If verification is successful, return the verified data
            return verified;
        }
        catch (error) {
            // Handle any errors that occur during token verification
            console.error("Refresh token verification failed:", error);
            throw new Error("Refresh token verification failed");
        }
    });
};
exports.verifyRefreshToken = verifyRefreshToken;
