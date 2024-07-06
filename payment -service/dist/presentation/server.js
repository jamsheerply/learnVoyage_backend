"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).json({
        message: `Payment service ON! Port : ${PORT}`,
    });
});
app.use("*", (req, res) => {
    res
        .status(404)
        .json({ success: false, status: 404, message: "Api Not found" });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`connected to payement service : Port ${PORT}`);
});
