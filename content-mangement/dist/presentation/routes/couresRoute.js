"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = require("../controllers/course/create");
const readAll_1 = require("../controllers/course/readAll");
const readById_1 = require("../controllers/course/readById");
const update_1 = require("../controllers/course/update");
const verifyToken_1 = require("../../infrastructure/jwt/verifyToken");
const router = (0, express_1.Router)();
router.post("/create", verifyToken_1.jwtMiddleware, create_1.createCourseController);
router.get("/read", readAll_1.readAllCourseController);
router.get("/read/:id", readById_1.readByIdCourseController);
router.patch("/update", verifyToken_1.jwtMiddleware, update_1.updateCourseController);
exports.default = router;