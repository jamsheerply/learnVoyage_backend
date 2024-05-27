"use strict";
// import {
//   handleUserAdded,
//   handleUserAddFailed,
// } from "../../presentation/controller/signupController";
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
exports.handleConsumer = void 0;
const handleConsumer = (msgType, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedMessage = JSON.parse(message);
        switch (msgType) {
            case "userAdded":
                // await handleUserAdded(parsedMessage);
                break;
            case "userAddFailed":
                // await handleUserAddFailed(parsedMessage);
                break;
            default:
                console.error(`Unhandled message type: ${msgType}`);
        }
    }
    catch (error) {
        console.error(`Failed to handle message of type ${msgType}:`, error);
    }
});
exports.handleConsumer = handleConsumer;
