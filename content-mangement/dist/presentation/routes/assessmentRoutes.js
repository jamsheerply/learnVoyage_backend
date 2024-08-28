"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../../infrastructure/jwt/verifyToken");
const create_1 = require("../controllers/assessment/create");
const read_1 = require("../controllers/assessment/read");
const readAssessmentById_1 = require("../controllers/assessment/readAssessmentById");
const update_1 = require("../controllers/assessment/update");
const readByCourseId_1 = require("../controllers/assessment/readByCourseId");
const router = (0, express_1.Router)();
router.post("/create", verifyToken_1.jwtMiddleware, create_1.createAssessementController);
router.get("/read", verifyToken_1.jwtMiddleware, read_1.readAssessementController);
router.get("/read/:id", verifyToken_1.jwtMiddleware, readAssessmentById_1.readAssessmentByIdController);
router.get("/read/courseId/:courseId", verifyToken_1.jwtMiddleware, readByCourseId_1.readAssessmentByCourseIdController);
router.patch("/update/:id", verifyToken_1.jwtMiddleware, update_1.updateAssessmentController);
exports.default = router;
