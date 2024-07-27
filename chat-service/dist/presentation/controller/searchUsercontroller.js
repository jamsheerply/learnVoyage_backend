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
exports.SearchUserController = void 0;
const SearchUserController = (dependencies) => {
    const { useCases: { searchUserUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const keyword = req.query.search;
            const currentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!keyword || !currentId) {
                return res.status(400).json({
                    success: false,
                    message: "Keyword or userId is missing from the request",
                });
            }
            const search = yield searchUserUseCase(dependencies).execute(keyword, currentId);
            if (!search) {
                return res.status(404).json({
                    success: false,
                    message: "No users found",
                });
            }
            res.status(200).json({
                success: true,
                data: search,
                message: "Users retrieved successfully!",
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.SearchUserController = SearchUserController;
