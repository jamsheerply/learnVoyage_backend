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
const notificationRoutes_1 = __importDefault(require("../presentation/routes/notificationRoutes"));
const consumerRpc_1 = require("../infrastructure/messageBroker/consumerRpc");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use("/", (req, res) => {
    res.status(200).json({
        success: false,
        status: 200,
        message: " notification is on ",
    });
});
app.use("/api/notification", notificationRoutes_1.default);
const PORT = process.env.PORT || 3003;
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: "Api Not found notification",
    });
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`notification-server is running on port ${PORT}`);
    (0, consumerRpc_1.startConsumer)("notification-service");
}));
