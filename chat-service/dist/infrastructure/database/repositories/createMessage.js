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
exports.createMessage = void 0;
const models_1 = require("../models");
const createMessage = (currentUserId, chatId, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMessage = {
            sender: currentUserId,
            content: content,
            chat: chatId,
        };
        // Create a new message
        let message = yield models_1.MessageModel.create(newMessage);
        // Populate the sender field
        message = yield message.populate("sender", "name pic");
        message = yield message.populate("chat");
        message = yield models_1.ChatModel.populate(message, {
            path: "chat.latestMessage",
        });
        message = yield models_1.ChatModel.populate(message, {
            path: "chat.latestMessage.sender",
        });
        message = yield models_1.UserModel.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });
        // Update the latest message in the chat
        const updatedChat = yield models_1.ChatModel.findByIdAndUpdate(chatId, { latestMessage: message }, { new: true });
        // console.log("Created Message:", message);
        return message;
    }
    catch (error) {
        const customError = error;
        throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
    }
});
exports.createMessage = createMessage;
