"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = require("../controllers/course/create");
const readAll_1 = require("../controllers/course/readAll");
const readById_1 = require("../controllers/course/readById");
const update_1 = require("../controllers/course/update");
const verifyToken_1 = require("../../infrastructure/jwt/verifyToken");
const roleMiddleware_1 = __importDefault(require("../../_lib/roleMiddleware"));
const router = (0, express_1.Router)();
router.post("/create", verifyToken_1.jwtMiddleware, (0, roleMiddleware_1.default)("instructor"), create_1.createCourseController);
router.get("/read", readAll_1.readAllCourseController);
router.get("/read/:id", readById_1.readByIdCourseController);
router.patch("/update", verifyToken_1.jwtMiddleware, (0, roleMiddleware_1.default)("instructor") || (0, roleMiddleware_1.default)("admin"), update_1.updateCourseController);
exports.default = router;
