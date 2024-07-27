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
exports.accessChat = void 0;
const models_1 = require("../models");
const accessChat = (currentUserId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isChat1 = yield models_1.ChatModel.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: currentUserId } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users")
            .populate("latestMessage")
            .exec();
        const isChat2 = yield models_1.UserModel.populate(isChat1, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        if (isChat2.length > 0) {
            return isChat2[0].toObject();
        }
        else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [currentUserId, userId],
            };
            const createdChat = yield models_1.ChatModel.create(chatData);
            const fullChat = yield models_1.ChatModel.findOne({
                _id: createdChat._id,
            }).populate("users");
            return fullChat === null || fullChat === void 0 ? void 0 : fullChat.toObject();
        }
    }
    catch (error) {
        const customError = error;
        throw new Error(customError === null || customError === void 0 ? void 0 : customError.message);
    }
});
exports.accessChat = accessChat;
