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
exports.createGroupChat = void 0;
const models_1 = require("../models");
const createGroupChat = (chatName, users, currentUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupChat = yield models_1.ChatModel.create({
            chatName: chatName,
            users: users,
            isGroupChat: true,
            groupAdmin: currentUserId,
        });
        const fullGroupchat = yield models_1.ChatModel.findOne({ _id: groupChat._id })
            .populate("users")
            .populate("groupAdmin");
        return fullGroupchat;
    }
    catch (error) {
        const customError = error;
        throw new Error(customError.message);
    }
});
exports.createGroupChat = createGroupChat;
