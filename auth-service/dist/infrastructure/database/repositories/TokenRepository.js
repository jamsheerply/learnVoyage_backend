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
exports.TokenRepository = void 0;
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
// Implementation of the ITokenRepository interface
exports.TokenRepository = {
    /**
     * Retrieve the token for a user by their ID
     * @param userId - The ID of the user
     * @returns A promise that resolves to the user's token
     */
    getTokenByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the token document by userId
                const token = yield tokenModel_1.default.findOne({ userId });
                return token; // Return null if not found, instead of throwing an error
            }
            catch (error) {
                // Handle any errors that occur during the database operation
                console.error("Error fetching token:", error);
                throw error;
            }
        });
    },
    /**
     * Update the token for a user
     * @param userId - The ID of the user
     * @param token - The new token
     * @returns A promise that resolves when the update is complete
     */
    updateToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the token document for the specified userId
                yield tokenModel_1.default.updateOne({ userId }, { token });
            }
            catch (error) {
                // Handle any errors that occur during the database operation
                console.error("Error updating token:", error);
                throw error;
            }
        });
    },
    /**
     * Add a new token for a user
     * @param userId - The ID of the user
     * @param token - The token to be added
     * @returns A promise that resolves to the created token
     */
    addToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a new token document
                const newToken = new tokenModel_1.default({ userId, token });
                yield newToken.save();
                return newToken;
            }
            catch (error) {
                // Handle any errors that occur during the database operation
                console.error("Error adding token:", error);
                throw error;
            }
        });
    },
};
