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
const handleConsumer_1 = require("./handleConsumer");
const consumeMessages = (queueName) => __awaiter(void 0, void 0, void 0, function* () {
    if (RMQConnections_1.channel) {
        yield RMQConnections_1.channel.assertQueue(queueName, { durable: true });
        console.log(`Waiting for messages in queue: ${queueName}...`);
        RMQConnections_1.channel.consume(queueName, (message) => {
            if (message) {
                const msgContent = JSON.parse(message.content.toString());
                console.log(`Received message: ${JSON.stringify(msgContent)}`);
                (0, handleConsumer_1.handleConsumer)(msgContent.type, msgContent.payload);
                RMQConnections_1.channel === null || RMQConnections_1.channel === void 0 ? void 0 : RMQConnections_1.channel.ack(message);
                console.log(`Acknowledged message: ${JSON.stringify(msgContent)}`);
            }
        }, { noAck: false });
    }
    else {
        console.error("RabbitMQ channel is not initialized");
    }
});
exports.consumeMessages = consumeMessages;
