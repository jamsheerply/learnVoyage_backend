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
exports.signupService = void 0;
const producer_1 = require("../../infrastructure/messaging/producer");
const RMQConnectins_1 = require("../../infrastructure/messaging/RMQConnectins");
const correlationId_1 = require("../../infrastructure/utility/correlationId");
const signupService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, RMQConnectins_1.connectToRabbitMQ)();
    yield (0, RMQConnectins_1.createQueue)("user-service");
    const correlationId = (0, correlationId_1.generateCorrelationId)();
    const replyQueue = yield (0, RMQConnectins_1.createQueue)("", { exclusive: true });
    // Listen for response messages
    const response = yield new Promise((resolve, reject) => {
        RMQConnectins_1.channel === null || RMQConnectins_1.channel === void 0 ? void 0 : RMQConnectins_1.channel.consume(replyQueue.queue, (message) => {
            if ((message === null || message === void 0 ? void 0 : message.properties.correlationId) === correlationId) {
                const msgContent = JSON.parse(message.content.toString());
                RMQConnectins_1.channel === null || RMQConnectins_1.channel === void 0 ? void 0 : RMQConnectins_1.channel.ack(message);
                resolve(msgContent);
            }
        }, { noAck: false });
        // Send the signup message to the user-service
        (0, producer_1.sendMessageToQueue)("user-service", "addUser", JSON.stringify(userData), {
            correlationId,
            replyTo: replyQueue.queue,
        }).catch(reject);
    });
    return response;
});
exports.signupService = signupService;
