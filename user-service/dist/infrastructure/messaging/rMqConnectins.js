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
exports.channel = exports.createQueue = exports.connectToRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let channel = null;
exports.channel = channel;
const connectToRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const connection = yield amqplib_1.default.connect((_a = process.env.RMQ_URL) !== null && _a !== void 0 ? _a : "amqp://localhost");
        exports.channel = channel = yield connection.createChannel();
        console.log("Connected to RabbitMQ");
    }
    catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        process.exit(1);
    }
});
exports.connectToRabbitMQ = connectToRabbitMQ;
const createQueue = (queueName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (channel) {
            yield channel.assertQueue(queueName, { durable: true }); // Ensure durable is true
            console.log(`Queue ${queueName} created or retrieved successfully`);
        }
        else {
            console.error("RabbitMQ channel is not initialized");
        }
    }
    catch (error) {
        console.error(`Failed to create or retrieve queue ${queueName}:`, error);
    }
});
exports.createQueue = createQueue;
