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
// import amqp, { Connection, Channel, Replies } from "amqplib";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// let channel: Channel | null = null;
// const connectToRabbitMQ = async (): Promise<void> => {
//   try {
//     const connection: Connection = await amqp.connect(
//       process.env.RMQ_URL ?? "amqp://localhost"
//     );
//     channel = await connection.createChannel();
//     console.log("Connected to RabbitMQ");
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ:", error);
//     process.exit(1);
//   }
// };
// const createQueue = async (
//   queueName: string,
//   options = {}
// ): Promise<Replies.AssertQueue> => {
//   try {
//     if (channel) {
//       const queue = await channel.assertQueue(queueName, {
//         durable: true,
//         ...options,
//       });
//       console.log(`Queue ${queue.queue} created or retrieved successfully`);
//       return queue;
//     } else {
//       throw new Error("RabbitMQ channel is not initialized");
//     }
//   } catch (error) {
//     console.error(`Failed to create or retrieve queue ${queueName}:`, error);
//     throw error;
//   }
// };
// export { connectToRabbitMQ, createQueue, channel };
// src/infrastructure/messaging/RMQConnections.ts
const amqplib_1 = __importDefault(require("amqplib"));
let connection = null;
exports.connection = connection;
let channel = null;
exports.channel = channel;
const connectToRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    exports.connection = connection = yield amqplib_1.default.connect((_a = process.env.RMQ_URL) !== null && _a !== void 0 ? _a : "amqp://localhost");
    exports.channel = channel = yield connection.createChannel();
});
exports.connectToRabbitMQ = connectToRabbitMQ;
const createQueue = (queue_1, ...args_1) => __awaiter(void 0, [queue_1, ...args_1], void 0, function* (queue, options = {}) {
    if (!channel) {
        throw new Error("Channel is not created. Call connectToRabbitMQ first.");
    }
    return channel.assertQueue(queue, options);
});
exports.createQueue = createQueue;
