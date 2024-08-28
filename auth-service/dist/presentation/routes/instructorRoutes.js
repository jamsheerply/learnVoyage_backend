"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../../infrastructure/security/jwt/verifyToken");
const getAllInstructorsController_1 = require("../controller/getAllInstructorsController");
const editInstructorController_1 = require("../controller/editInstructorController");
const roleMiddleware_1 = __importDefault(require("../middlewares/roleMiddleware"));
const router = (0, express_1.Router)();
router.get("/", getAllInstructorsController_1.getAllInstructorsController);
router.patch("/edit", verifyToken_1.jwtMiddleware, (0, roleMiddleware_1.default)("admin"), editInstructorController_1.editInstructorController);
exports.default = router;
