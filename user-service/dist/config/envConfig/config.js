"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_NAME = String(process.env.DB_NAME);
const DB_PASS = String(process.env.DB_PASS);
exports.MONGODB_URI = `mongodb+srv://${DB_NAME}:${DB_PASS}@learnvoyage.a3qrwmv.mongodb.net/user-service?retryWrites=true&w=majority&appName=LearnVoyage`;
