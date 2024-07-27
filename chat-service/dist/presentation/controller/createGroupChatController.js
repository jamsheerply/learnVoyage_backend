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
exports.createGroupChatController = void 0;
const createGroupChatController = (dependencies) => {
    const { useCases: { createGroupChatUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { users, chatName } = req.body;
            if (!users || !chatName) {
                throw new Error("Please fill all the fields");
            }
            var usersParsed = users;
            if (usersParsed.length < 1) {
                throw new Error("more than 1 users required to form  a group chat");
            }
            usersParsed.push((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const result = yield createGroupChatUseCase(dependencies).execute(chatName, usersParsed, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
            res.status(200).json({
                sucess: true,
                data: result,
                message: "group chat create successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.createGroupChatController = createGroupChatController;
