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
const port = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use("/api/users", (0, express_http_proxy_1.default)("http://localhost:3001"));
app.use("/api/content-management", (0, express_http_proxy_1.default)("http://localhost:3004"));
app.use("/api/payment-service", (0, express_http_proxy_1.default)("http://localhost:3005"));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
//npm run build
//npm start
