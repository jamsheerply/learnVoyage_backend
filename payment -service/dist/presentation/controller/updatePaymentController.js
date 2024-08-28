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
exports.updatePaymentController = void 0;
const producerRpc_1 = require("../../infrastructure/messageBroker/producerRpc");
const updatePaymentController = (dependencies) => {
    const { useCases: { updatePaymentUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id, status } = req.body;
            console.log(req.body);
            if (!status || !_id) {
                throw new Error("missing required status field");
            }
            const result = yield updatePaymentUseCase(dependencies).execute(req.body);
            console.log("result?.status", result === null || result === void 0 ? void 0 : result.status);
            if ((result === null || result === void 0 ? void 0 : result._id) && result.status === "completed") {
                (0, producerRpc_1.sendMessage)("content-management-service", {
                    type: "createEnrollment",
                    data: result,
                }, (response) => {
                    console.log("Response from content-management-service:", response);
                    // Handle the response here
                });
            }
            return res.status(200).json({
                success: true,
                data: result,
                message: "payment updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.updatePaymentController = updatePaymentController;
