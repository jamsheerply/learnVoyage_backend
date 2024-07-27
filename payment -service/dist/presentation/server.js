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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorhandler_1 = __importDefault(require("../_lib/common/errorhandler"));
const dependencies_1 = require("../_boot/dependencies");
const database_1 = __importDefault(require("../_boot/database"));
const paymentRoutes_1 = require("../infrastructure/routes/paymentRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.get("/", (req, res) => {
    res.status(200).json({
        message: `Payment service ON! Port : ${PORT}`,
    });
});
app.use("/", (0, paymentRoutes_1.paymentRoutes)(dependencies_1.dependencies));
app.use(errorhandler_1.default);
app.use("*", (req, res) => {
    res
        .status(404)
        .json({ success: false, status: 404, message: "Api Not found" });
});
const PORT = process.env.PORT;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`connected to payement service : Port ${PORT}`);
    yield (0, database_1.default)();
}));
