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
exports.signinService = void 0;
const correlationId_1 = require("../../infrastructure/utility/correlationId");
const producer_1 = require("../../infrastructure/messaging/producer");
const RMQConnections_1 = require("../../infrastructure/messaging/RMQConnections");
const signinService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, RMQConnections_1.connectToRabbitMQ)();
    yield (0, RMQConnections_1.createQueue)("user-service");
    const correlationId = (0, correlationId_1.generateCorrelationId)();
    const replyQueue = yield (0, RMQConnections_1.createQueue)("", { exclusive: true });
    // Listen for response messages
    const response = yield new Promise((resolve, reject) => {
        RMQConnections_1.channel === null || RMQConnections_1.channel === void 0 ? void 0 : RMQConnections_1.channel.consume(replyQueue.queue, (message) => {
            if ((message === null || message === void 0 ? void 0 : message.properties.correlationId) === correlationId) {
                const msgContent = JSON.parse(message.content.toString());
                RMQConnections_1.channel === null || RMQConnections_1.channel === void 0 ? void 0 : RMQConnections_1.channel.ack(message);
                resolve(msgContent);
            }
        }, { noAck: false });
        //send the signup message to the user-service
        (0, producer_1.sendMessageToQueue)("user-service", "loginUser", JSON.stringify(userData), {
            correlationId,
            replyTo: replyQueue.queue,
        }).catch(reject);
    });
    console.log(response);
    console.log("response ");
    return response;
});
exports.signinService = signinService;
