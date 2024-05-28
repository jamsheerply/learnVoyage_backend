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
const RMQConnections_1 = require("./RMQConnections");
const sendMessageToQueue = (queueName_1, msgType_1, message_1, ...args_1) => __awaiter(void 0, [queueName_1, msgType_1, message_1, ...args_1], void 0, function* (queueName, msgType, message, options = {}) {
    try {
        if (RMQConnections_1.channel) {
            const msgContent = JSON.stringify({ type: msgType, payload: message });
            yield RMQConnections_1.channel.sendToQueue(queueName, Buffer.from(msgContent), options);
            console.log(`Sent message to queue ${queueName}: ${msgContent}`);
        }
        else {
            console.error("RabbitMQ channel is not initialized");
        }
    }
    catch (error) {
        console.error(`Failed to send message to queue ${queueName}:`, error);
    }
});
exports.sendMessageToQueue = sendMessageToQueue;
