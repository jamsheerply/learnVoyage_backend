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
exports.signupController = void 0;
const addUserValidation_1 = require("../../utils/validation/addUserValidation");
const signupController = (dependencies) => {
    const { useCase: { signupUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = req.body;
            const { error } = addUserValidation_1.addUserValidation.validate(userData);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error,
                    data: {},
                });
            }
            const user = yield signupUseCase(dependencies).execute(userData);
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: user,
            });
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.signupController = signupController;
