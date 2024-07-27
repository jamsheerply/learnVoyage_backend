import { Router } from "express";
import { jwtMiddleware } from "../../infrastructure/jwt/verifyToken";
import { createEnrollmentController } from "../controllers/enrollment/create";
import { readEnrollmentController } from "../controllers/enrollment/read";
import { getEnrollmentByIdController } from "../controllers/enrollment/getById";
import { getEnrollmentByCourseIdController } from "../controllers/enrollment/getByCourseId";

const router = Router();

router.post("/create", jwtMiddleware, createEnrollmentController);
router.get("/read", jwtMiddleware, readEnrollmentController);
router.get("/read/:id", jwtMiddleware, getEnrollmentByIdController);
router.get(
  "/readby/:courseId",
  jwtMiddleware,
  getEnrollmentByCourseIdController
);

export default router;
