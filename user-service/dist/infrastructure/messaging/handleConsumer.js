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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConsumer = void 0;
const signinUseCase_1 = require("../../application/signinUseCase");
const signupUseCase_1 = require("../../application/signupUseCase");
const signupRepository_1 = require("../database/repositories/signupRepository");
const bcrypt_1 = __importDefault(require("../security/bcrypt"));
const rMqConnectins_1 = require("./rMqConnectins");
const handleConsumer = (msgType, message, properties) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedMessage = JSON.parse(message);
        switch (msgType) {
            case "addUser":
                const { firstName, lastName, email: signupEmail, password: signupPassword, } = parsedMessage;
                try {
                    const newUser = yield (0, signupUseCase_1.signupUseCase)(signupRepository_1.signupRepository, bcrypt_1.default)({
                        firstName,
                        lastName,
                        email: signupEmail,
                        password: signupPassword,
                    });
                    // Reply with success
                    rMqConnectins_1.channel === null || rMqConnectins_1.channel === void 0 ? void 0 : rMqConnectins_1.channel.sendToQueue(properties.replyTo, Buffer.from(JSON.stringify(newUser)), {
                        correlationId: properties.correlationId,
                    });
                }
                catch (error) {
                    console.error("Error in addUser case:", error);
                    // Reply with failure
                    rMqConnectins_1.channel === null || rMqConnectins_1.channel === void 0 ? void 0 : rMqConnectins_1.channel.sendToQueue(properties.replyTo, Buffer.from(JSON.stringify({ error: "Failed to add user" })), {
                        correlationId: properties.correlationId,
                    });
                }
                break;
            case "loginUser":
                const { email: loginEmail, password: loginPassword } = parsedMessage;
                try {
                    const loginUser = yield (0, signinUseCase_1.signinUseCase)(signupRepository_1.signupRepository, bcrypt_1.default)(loginEmail, loginPassword);
                    // Reply with success
                    rMqConnectins_1.channel === null || rMqConnectins_1.channel === void 0 ? void 0 : rMqConnectins_1.channel.sendToQueue(properties.replyTo, Buffer.from(JSON.stringify(loginUser)), {
                        correlationId: properties.correlationId,
                    });
                }
                catch (error) {
                    console.error("Error in loginUser case:", error);
                    // Reply with failure
                    rMqConnectins_1.channel === null || rMqConnectins_1.channel === void 0 ? void 0 : rMqConnectins_1.channel.sendToQueue(properties.replyTo, Buffer.from(JSON.stringify({ error: "Failed to login user" })), {
                        correlationId: properties.correlationId,
                    });
                }
                break;
            default:
                console.error(`Unhandled message type: ${msgType}`);
                break;
        }
    }
    catch (error) {
        console.error(`Failed to process message of type ${msgType}:`, error);
    }
});
exports.handleConsumer = handleConsumer;
