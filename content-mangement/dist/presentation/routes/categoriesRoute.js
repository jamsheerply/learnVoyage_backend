"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = require("../controllers/category/create");
const readAll_1 = require("../controllers/category/readAll");
const readById_1 = require("../controllers/category/readById");
const update_1 = require("../controllers/category/update");
const verifyToken_1 = require("../../infrastructure/jwt/verifyToken");
const roleMiddleware_1 = __importDefault(require("../../_lib/roleMiddleware"));
const router = (0, express_1.Router)();
router.post("/create", verifyToken_1.jwtMiddleware, (0, roleMiddleware_1.default)("admin"), create_1.createCategoryController);
router.get("/read", readAll_1.readAllCategoryController);
router.get("/read/:id", verifyToken_1.jwtMiddleware, (0, roleMiddleware_1.default)("admin"), readById_1.readByIdCategoryController);
router.patch("/update", verifyToken_1.jwtMiddleware, (0, roleMiddleware_1.default)("admin"), update_1.updateCategoryController);
exports.default = router;
