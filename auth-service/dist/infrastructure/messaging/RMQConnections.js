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
exports.channel = exports.connection = exports.createQueue = exports.connectToRabbitMQ = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const amqplib_1 = __importDefault(require("amqplib"));
let connection = null;
exports.connection = connection;
let channel = null;
exports.channel = channel;
const connectToRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        exports.connection = connection = yield amqplib_1.default.connect((_a = process.env.RMQ_URL) !== null && _a !== void 0 ? _a : "amqp://localhost");
        connection.on("error", (err) => {
            console.error("RabbitMQ connection error:", err);
            exports.connection = connection = null;
            exports.channel = channel = null;
        });
        connection.on("close", () => {
            console.log("RabbitMQ connection closed. Attempting to reconnect...");
            exports.connection = connection = null;
            exports.channel = channel = null;
            setTimeout(connectToRabbitMQ, 5000); // Retry after 5 seconds
        });
        exports.channel = channel = yield connection.createChannel();
        channel.on("error", (err) => {
            console.error("RabbitMQ channel error:", err);
        });
        console.log("Connected to RabbitMQ");
    }
    catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        setTimeout(connectToRabbitMQ, 5000); // Retry after 5 seconds
    }
});
exports.connectToRabbitMQ = connectToRabbitMQ;
const createQueue = (queue_1, ...args_1) => __awaiter(void 0, [queue_1, ...args_1], void 0, function* (queue, options = {}) {
    if (!channel) {
        throw new Error("Channel is not created. Call connectToRabbitMQ first.");
    }
    return channel.assertQueue(queue, options);
});
exports.createQueue = createQueue;
