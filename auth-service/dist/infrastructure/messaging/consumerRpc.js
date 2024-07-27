"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumer = exports.registerHandler = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RMQ_URL = process.env.RMQ_URL;
const handlers = {};
const registerHandler = (messageType, handler) => {
    handlers[messageType] = handler;
};
exports.registerHandler = registerHandler;
const startConsumer = (queueName) => {
    callback_api_1.default.connect(RMQ_URL, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
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
        });
    });
};
exports.startConsumer = startConsumer;
