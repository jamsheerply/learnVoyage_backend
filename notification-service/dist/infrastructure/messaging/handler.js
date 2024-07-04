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
exports.handleNotification = void 0;
const nodemailerClient_1 = require("../email/nodemailerClient");
const uuid_1 = require("uuid");
const handleNotification = (notificationData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(notificationData);
    const notification = {
        id: (0, uuid_1.v4)(),
        recipientEmail: notificationData.email,
        subject: notificationData.subject || "Notification",
        message: notificationData.message,
        type: notificationData.type,
    };
    yield nodemailerClient_1.nodemailerClient.send(notification);
});
exports.handleNotification = handleNotification;
