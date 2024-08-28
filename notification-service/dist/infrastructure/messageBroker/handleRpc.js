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
exports.sentOtpHandler = void 0;
const nodemailerClient_1 = require("../email/nodemailerClient");
const sentOtpHandler = (msg, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:", content);
    const notification = {
        recipientEmail: content.data.email,
        subject: "Send OTP for verification",
        message: content.data.message,
        type: "createOtpTemplate",
    };
    yield nodemailerClient_1.nodemailerClient.send(notification);
    const response = {
        success: true,
        data: `Processed ${content.data.email} with sentOtpHandler`,
        message: "Successfully processed OTP",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
});
exports.sentOtpHandler = sentOtpHandler;
