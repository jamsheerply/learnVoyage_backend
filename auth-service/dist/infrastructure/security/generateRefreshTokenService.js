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
exports.generateRefreshTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to generate refresh tokens, accepts refresh token private key as an argument
const generateRefreshTokenService = (tokenRepository, REFRESH_TOKEN_PRIVATE_KEY) => {
    return {
        // Method to generate a refresh token
        generateToken: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            };
            const generatedRefreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_PRIVATE_KEY, {
                expiresIn: "30d",
            });
            try {
                // Check if token exists for the user
                const token = yield tokenRepository.getTokenByUserId(user.id);
                if (token) {
                    // Update the existing token
                    yield tokenRepository.updateToken(user.id, generatedRefreshToken);
                }
                else {
                    // Add a new token
                    yield tokenRepository.addToken(user.id, generatedRefreshToken);
                }
            }
            catch (error) {
                console.error("Error handling token repository:", error);
                throw error;
            }
            return generatedRefreshToken;
        }),
    };
};
exports.generateRefreshTokenService = generateRefreshTokenService;
