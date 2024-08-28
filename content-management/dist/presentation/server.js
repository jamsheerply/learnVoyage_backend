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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dbConnections_1 = __importDefault(require("../infrastructure/database/dbConnections"));
const categoriesRoute_1 = __importDefault(require("./routes/categoriesRoute"));
const couresRoutes_1 = __importDefault(require("./routes/couresRoutes"));
const enrollmentRoutes_1 = __importDefault(require("./routes/enrollmentRoutes"));
const assessmentRoutes_1 = __importDefault(require("./routes/assessmentRoutes"));
const resultRoutes_1 = __importDefault(require("./routes/resultRoutes"));
const rateAndReviewRoutes_1 = __importDefault(require("./routes/rateAndReviewRoutes"));
const consumerRpc_1 = require("../infrastructure/messageBroker/consumerRpc");
const verifyToken_1 = require("../infrastructure/jwt/verifyToken");
const videoStreaming_1 = __importDefault(require("./controllers/streaming/videoStreaming"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", verifyToken_1.jwtMiddleware, (req, res) => {
    res.status(200).json({
        message: `content Management service ON! port:${PORT}`,
    });
});
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://learn-voyage-frontend.vercel.app",
        "https://learn-voyage.jamsheerply.life",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use("/category", categoriesRoute_1.default);
app.use("/course", couresRoutes_1.default);
app.use("/enrollment", enrollmentRoutes_1.default);
app.use("/assessment", assessmentRoutes_1.default);
app.use("/result", resultRoutes_1.default);
app.use("/rate-and-review", rateAndReviewRoutes_1.default);
app.use("/videos", videoStreaming_1.default);
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`content-management is runing on port ${PORT}`);
    yield (0, dbConnections_1.default)();
    (0, consumerRpc_1.startConsumer)("content-management-service");
}));
