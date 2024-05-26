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
const rMqConnectins_1 = require("./rMqConnectins");
const sendMessageToQueue = (queueName, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (rMqConnectins_1.channel) {
            yield rMqConnectins_1.channel.sendToQueue(queueName, Buffer.from(message));
            console.log(` [x] Sent ${message}`);
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
