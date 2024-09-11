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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const instructorRoutes_1 = __importDefault(require("./routes/instructorRoutes"));
const dbConnections_1 = __importDefault(require("../infrastructure/database/dbConnections"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "3001", 10);
const isProduction = process.env.NODE_ENV === "production";
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        process.env.FRONTEND_URL_1,
        process.env.FRONTEND_URL_2,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));
// Health check route
app.get("/", (req, res) => {
    // setTimeout(() => {
    res.status(200).json({
        message: `Auth service is healthy! Running on port: ${PORT}`,
        health: true,
        environment: isProduction ? "production" : "development",
    });
    // }, 36000);
});
// Production routes (for use with Ingress)
app.use("/api/users/auth", userRoutes_1.default);
app.use("/api/users/instructor", instructorRoutes_1.default);
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: "API not found in auth service",
    });
});
const server = app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🌱🌱🌱 Auth server is running on port ${PORT} in ${isProduction ? "🌟 production" : "🚧 development"} mode 🌱🌱🌱`);
    yield (0, dbConnections_1.default)();
}));
// Handle SIGTERM for graceful shutdown
process.on("SIGTERM", () => {
    console.log("Received SIGTERM, shutting down gracefully...");
    server.close(() => {
        console.log("Closed remaining connections");
        process.exit(0);
    });
});
// Optional: Handle other termination signals like SIGINT (Ctrl+C)
process.on("SIGINT", () => {
    console.log("Received SIGINT, shutting down gracefully...");
    server.close(() => {
        console.log("Closed remaining connections");
        process.exit(0);
    });
});
