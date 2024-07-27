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
exports.allMessageByIdController = void 0;
const allMessageByIdController = (dependencies) => {
    const { useCases: { allMessageByIdUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { chatId } = req.params;
            if (!chatId) {
                throw new Error("chatId param not sent with request");
            }
            const result = yield allMessageByIdUseCase(dependencies).execute(chatId);
            res
                .status(200)
                .json({
                success: true,
                data: result,
                message: "fetch all message byId successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.allMessageByIdController = allMessageByIdController;
