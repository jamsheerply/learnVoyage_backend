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
exports.accessChatController = void 0;
const accessChatController = (dependencies) => {
    const { useCases: { accessChatUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { userId } = req.body;
            if (!userId) {
                throw new Error("userId param not sent with request");
            }
            const result = yield accessChatUseCase(dependencies).execute((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, userId);
            res.status(200).json({
                success: true,
                data: result,
                message: "chat accessed  success!",
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.accessChatController = accessChatController;
