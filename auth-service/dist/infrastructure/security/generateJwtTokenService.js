"use strict";
// import jwt, { verify } from "jsonwebtoken";
// import { IUser } from "../../domain/entities/user.entity";
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
exports.verifyJwtTokenService = exports.generateJwtTokenService = void 0;
// const generateJwtTokenService = (secret: string) => {
//   return {
//     generateToken: (user: IUser) => {
//       return jwt.sign(
//         {
//           id: user.id,
//           email: user.email,
//           role: user.role,
//           isVerified: user.isVerified,
//         },
//         secret,
//         {
//           expiresIn: "24h",
//         }
//       );
//     },
//   };
// };
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
// export { generateJwtTokenService, verifyJwtTokenService };
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to generate JWT tokens, accepts access and refresh token private keys as arguments
const generateJwtTokenService = (tokenRepository, ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY) => {
    return {
        // Method to generate an access token
        generateToken: (user) => {
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            };
            return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
                expiresIn: "14m",
            });
        },
        // Method to generate a refresh token
        generateRefreshToken: (user) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.generateJwtTokenService = generateJwtTokenService;
