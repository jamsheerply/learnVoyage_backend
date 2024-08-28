import { Router } from "express";
import { jwtMiddleware } from "../../infrastructure/jwt/verifyToken";
import { createAssessementController } from "../controllers/assessment/create";
import { readAssessementController } from "../controllers/assessment/read";
import { readAssessmentByIdController } from "../controllers/assessment/readAssessmentById";
import { updateAssessmentController } from "../controllers/assessment/update";
import { readAssessmentByCourseIdController } from "../controllers/assessment/readByCourseId";

const router = Router();

router.post("/create", jwtMiddleware, createAssessementController);
router.get("/read", jwtMiddleware, readAssessementController);
router.get("/read/:id", jwtMiddleware, readAssessmentByIdController);
router.get(
  "/read/courseId/:courseId",
  jwtMiddleware,
  readAssessmentByCourseIdController
);
router.patch("/update/:id", jwtMiddleware, updateAssessmentController);

export default router;
