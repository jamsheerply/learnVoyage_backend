"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumer = exports.registerHandler = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const dotenv_1 = __importDefault(require("dotenv"));
const handleRpc_1 = require("./handleRpc");
dotenv_1.default.config();
const RMQ_URL = process.env.RMQ_URL;
const handlers = {};
const registerHandler = (messageType, handler) => {
    handlers[messageType] = handler;
};
exports.registerHandler = registerHandler;
const connectWithRetry = (queueName, retries = 0) => {
    const maxRetries = 10;
    const retryDelay = Math.min(1000 * Math.pow(2, retries), 30000); // Exponential backoff with a max delay of 30 seconds
    callback_api_1.default.connect(RMQ_URL, (error0, connection) => {
        if (error0) {
            console.error("Failed to connect to RabbitMQ, retrying in", retryDelay / 1000, "seconds:", error0.message);
            setTimeout(() => connectWithRetry(queueName, retries + 1), retryDelay);
            return;
        }
        console.log("Connected to RabbitMQ");
        connection.createChannel((error1, channel) => {
            if (error1) {
                console.error("Failed to create a channel, retrying in", retryDelay / 1000, "seconds:", error1.message);
                connection.close();
                setTimeout(() => connectWithRetry(queueName, retries + 1), retryDelay);
                return;
            }
            channel.assertQueue(queueName, {
                durable: false,
            });
            channel.prefetch(1);
            console.log(` [x] Awaiting RPC requests on queue: ${queueName}`);
            channel.consume(queueName, (msg) => {
                if (msg) {
                    const messageContent = msg.content.toString();
                    const parsedContent = JSON.parse(messageContent);
                    const handler = handlers[parsedContent.type];
                    if (handler) {
                        handler(msg, channel);
                    }
                    else {
                        console.log(` [x] No handler for message type: ${parsedContent.type}`);
                        channel.ack(msg);
                    }
                }
            }, {
                noAck: false,
            });
            // Handle connection errors
            connection.on("error", (err) => {
                console.error("Connection error:", err.message);
                channel.close(() => connection.close());
                setTimeout(() => connectWithRetry(queueName, retries + 1), retryDelay);
            });
            // Handle connection close
            connection.on("close", () => {
                console.error("Connection closed, retrying in", retryDelay / 1000, "seconds");
                setTimeout(() => connectWithRetry(queueName, retries + 1), retryDelay);
            });
        });
    });
};
const startConsumer = (queueName) => {
    connectWithRetry(queueName);
};
exports.startConsumer = startConsumer;
(0, exports.registerHandler)("createEnrollment", handleRpc_1.createEnrollmentHandler);
