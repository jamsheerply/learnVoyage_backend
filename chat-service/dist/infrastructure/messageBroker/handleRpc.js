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
exports.createUserHandler = exports.exampleHandler = void 0;
const dependencies_1 = require("../../_boot/dependencies");
const usecases_1 = require("../../application/usecases");
const exampleHandler = (msg, channel) => {
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:", content);
    const response = {
        success: true,
        data: `Processed ${content.data} with exampleHandler`,
        sender: "consumer",
        receiver: "producer",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
};
exports.exampleHandler = exampleHandler;
const createUserHandler = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:", content.data);
    const newUser = yield (0, usecases_1.createUserUseCase)(dependencies_1.dependencies).execute(content.data);
    const response = {
        success: true,
        data: newUser,
        message: "successfully created",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
});
exports.createUserHandler = createUserHandler;
