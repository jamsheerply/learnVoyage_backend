"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RMQ_URL = process.env.RMQ_URL;
const pendingRequests = {};
const sendMessage = (queueName, message, callback) => {
    console.log("Starting to send message...");
    callback_api_1.default.connect(RMQ_URL, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            const correlationId = (0, uuid_1.v4)();
            const replyQueue = "amq.rabbitmq.reply-to";
            pendingRequests[correlationId] = callback;
            channel.assertQueue(queueName, {
                durable: false,
            });
            // Consume messages from the reply queue
            channel.consume(replyQueue, (msg) => {
                if (msg && msg.properties.correlationId === correlationId) {
                    console.log(" [.] Got response:", msg.content.toString());
                    pendingRequests[correlationId](JSON.parse(msg.content.toString()));
                    delete pendingRequests[msg.properties.correlationId];
                    if (Object.keys(pendingRequests).length === 0) {
                        connection.close();
                    }
                }
            }, {
                noAck: true,
            }, (consumeError, _ok) => {
                if (consumeError) {
                    throw consumeError;
                }
                // Send the message to the queue after consuming is set up
                channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
                    correlationId,
                    replyTo: replyQueue,
                });
                console.log(`Sent message to queue ${queueName} with correlationId ${correlationId}`);
            });
        });
    });
};
exports.sendMessage = sendMessage;
