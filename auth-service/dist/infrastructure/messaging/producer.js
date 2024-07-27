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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToQueue = void 0;
// src/infrastructure/messaging/producer.ts
const RMQConnections_1 = require("./RMQConnections");
const sendMessageToQueue = (queue_1, message_1, ...args_1) => __awaiter(void 0, [queue_1, message_1, ...args_1], void 0, function* (queue, message, options = {}) {
    if (!RMQConnections_1.channel) {
        throw new Error("Channel is not created. Call connectToRabbitMQ first.");
    }
    return RMQConnections_1.channel.sendToQueue(queue, Buffer.from(message), options);
});
exports.sendMessageToQueue = sendMessageToQueue;
