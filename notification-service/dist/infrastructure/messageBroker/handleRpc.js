"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = exports.exampleHandler = void 0;
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
const createUserHandler = (msg, channel) => {
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:", content);
    const response = {
        success: true,
        data: `Processed ${content.data} with exampleHandler`,
        message: "suceessfully created",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
};
exports.createUserHandler = createUserHandler;
