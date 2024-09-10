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
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGINS = [process.env.FRONTEND_URL];
const app = (0, express_1.default)();
const isProduction = process.env.NODE_ENV === "production";
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    optionsSuccessStatus: 200,
}));
const proxyRoutes = [
    { pathRegex: /^\/api\/users/, target: process.env.USERS_URL },
    { pathRegex: /^\/api\/chat-service/, target: process.env.CHAT_SERVICE_URL },
    {
        pathRegex: /^\/api\/content-management/,
        target: process.env.CONTENT_MANAGEMENT_URL,
    },
    {
        pathRegex: /^\/api\/notification-service/,
        target: process.env.NOTIFICATIONS_SERVICE_URL,
    },
    {
        pathRegex: /^\/api\/payment-service/,
        target: process.env.PAYMENT_SERVICE_URL,
    },
];
app.get("/", (req, res) => {
    res.status(200).json({
        message: `API Gateway is healthy! Running on port: ${PORT}`,
        environment: isProduction ? "production" : "development",
    });
});
app.use((req, res, next) => {
    const route = proxyRoutes.find((route) => route.pathRegex.test(req.path));
    if (route) {
        return (0, express_http_proxy_1.default)(route.target)(req, res, next);
    }
    next();
});
app.use((req, res) => {
    res.status(404).send("Not Found");
});
app.listen(PORT, () => {
    console.log(`🌱🌱🌱 API Gateway is running on port ${PORT} in ${isProduction ? "🌟 production" : "🚧 development"} mode 🌱🌱🌱`);
});
