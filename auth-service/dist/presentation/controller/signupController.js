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
exports.signupController = void 0;
const producer_1 = require("../../infrastructure/messaging/producer");
const rMqConnectins_1 = require("../../infrastructure/messaging/rMqConnectins");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        yield (0, rMqConnectins_1.connectToRabbitMQ)();
        yield (0, rMqConnectins_1.createQueue)("user-service");
        yield (0, producer_1.sendMessageToQueue)("user-service", "addUser", JSON.stringify(req.body));
        return res.status(201).json({ success: true, data: req.body });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Failed to sign up user" });
    }
});
exports.signupController = signupController;
