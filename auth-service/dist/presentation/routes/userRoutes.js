"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signinController_1 = require("../controller/signinController");
const signupController_1 = require("../controller/signupController");
const getAllInstructorsController_1 = require("../controller/getAllInstructorsController");
const editInstructorController_1 = require("../controller/editInstructorController");
const dotenv_1 = __importDefault(require("dotenv"));
const resendOtpController_1 = require("../controller/resendOtpController");
const isBlockedController_1 = require("../controller/isBlockedController");
const logoutController_1 = require("../controller/logoutController");
dotenv_1.default.config();
const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY;
const REFRESH_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY;
const router = (0, express_1.Router)();
router.post("/signup", signupController_1.signupController);
router.post("/resend-otp", resendOtpController_1.resendOtpController);
router.post("/verify-otp", signupController_1.verifyOtpController);
router.post("/signin", signinController_1.signinController);
router.get("/logout", logoutController_1.logoutController);
router.get("/isBlocked/:id", isBlockedController_1.isBlockedController);
router.get("/instructors", 
// authMiddleware(ACCESS_TOKEN_PRIVATE_KEY!, REFRESH_TOKEN_PRIVATE_KEY!),
// roleMiddleware("admin"),
getAllInstructorsController_1.getAllInstructorsController);
router.patch("/instructor/edit", 
// authMiddleware(ACCESS_TOKEN_PRIVATE_KEY!, REFRESH_TOKEN_PRIVATE_KEY!),
// roleMiddleware("admin"),
editInstructorController_1.editInstructorController);
exports.default = router;
