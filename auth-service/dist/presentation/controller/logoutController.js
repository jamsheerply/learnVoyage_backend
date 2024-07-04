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
exports.logoutController = void 0;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear access token cookie
        res.cookie("accessToken", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(0),
        });
        // Clear refresh token cookie
        res.cookie("refreshToken", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(0),
        });
        return res
            .status(200)
            .json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.logoutController = logoutController;
