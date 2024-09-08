"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Constants
const PORT = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGINS = [process.env.FRONTEND_URL];
// Initialize Express app
const app = (0, express_1.default)();
const isProduction = process.env.NODE_ENV === "production";
// Middleware
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    optionsSuccessStatus: 200,
}));
// Proxy routes configuration
const proxyRoutes = [
    { pathRegex: /^\/api\/users/, target: "http://localhost:3001" },
    { pathRegex: /^\/api\/chat-service/, target: "http://localhost:3002" },
    { pathRegex: /^\/api\/content-management/, target: "http://localhost:3003" },
    {
        pathRegex: /^\/api\/notification-service/,
        target: "http://localhost:3004",
    },
    { pathRegex: /^\/api\/payment-service/, target: "http://localhost:3005" },
];
app.get("/", (req, res) => {
    res.status(200).json({
        message: `API Gateway is healthy! Running on port: ${PORT}`,
        environment: isProduction ? "production" : "development",
    });
});
// Proxy middleware
app.use((req, res, next) => {
    const route = proxyRoutes.find((route) => route.pathRegex.test(req.path));
    if (route) {
        return (0, express_http_proxy_1.default)(route.target)(req, res, next);
    }
    next();
});
// Default route
app.use((req, res) => {
    res.status(404).send("Not Found");
});
// Start the server
app.listen(PORT, () => {
    console.log(`🌱🌱🌱 API Gateway is running on port ${PORT} in ${isProduction ? "🌟 production" : "🚧 development"} mode 🌱🌱🌱`);
});
