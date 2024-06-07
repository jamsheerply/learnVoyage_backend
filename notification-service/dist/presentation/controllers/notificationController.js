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
exports.sendNotificationController = void 0;
const sendNotificationController = (notificationService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = req.body;
        yield notificationService(notification);
        res.status(200).send({ message: "Notification sent" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.sendNotificationController = sendNotificationController;
