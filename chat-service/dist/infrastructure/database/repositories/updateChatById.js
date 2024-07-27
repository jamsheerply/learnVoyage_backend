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
exports.updateChatById = void 0;
const models_1 = require("../models");
const updateChatById = (chatId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedChat = yield models_1.ChatModel.findByIdAndUpdate(chatId, data, {
            new: true,
        })
            .populate("users")
            .populate("groupAdmin");
        return updatedChat;
    }
    catch (error) {
        const customError = error;
        throw new Error(customError.message);
    }
});
exports.updateChatById = updateChatById;
