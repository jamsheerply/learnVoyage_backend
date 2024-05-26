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
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dbConnections_1 = __importDefault(require("../infrastructure/database/dbConnections"));
const rMqConnectins_1 = require("../infrastructure/messaging/rMqConnectins");
const consumer_1 = require("../infrastructure/messaging/consumer");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", userRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnections_1.default)();
    yield (0, rMqConnectins_1.connectToRabbitMQ)();
    (0, consumer_1.consumeMessages)("user-service");
    console.log(`server is running on port ${PORT}`);
}));
