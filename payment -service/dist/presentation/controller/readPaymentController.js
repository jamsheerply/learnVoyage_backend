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
exports.readPaymentController = void 0;
const readPaymentController = (dependencies) => {
    const { useCases: { readPaymentUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { page, limit, search, method, status } = req.query;
            const queryData = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
                search: search || undefined,
                method: Array.isArray(method)
                    ? method
                    : method
                        ? [method]
                        : [],
                status: Array.isArray(status)
                    ? status
                    : status
                        ? [status]
                        : [],
            };
            console.log(queryData);
            const result = yield readPaymentUseCase(dependencies).execute(queryData);
            return res.status(200).json({
                success: true,
                data: result,
                message: "read payment successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.readPaymentController = readPaymentController;
