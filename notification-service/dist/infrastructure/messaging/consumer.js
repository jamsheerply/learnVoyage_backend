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
exports.consumeMessages = void 0;
const RMQConnections_1 = require("./RMQConnections");
const handler_1 = require("./handler");
const consumeMessages = (queueName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!RMQConnections_1.channel) {
        throw new Error("Channel is not created. Call connectToRabbitMQ first.");
    }
    RMQConnections_1.channel.consume(queueName, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg !== null) {
            const notification = JSON.parse(msg.content.toString());
            yield (0, handler_1.handleNotification)(notification);
            RMQConnections_1.channel === null || RMQConnections_1.channel === void 0 ? void 0 : RMQConnections_1.channel.ack(msg);
        }
    }), { noAck: false });
});
exports.consumeMessages = consumeMessages;
