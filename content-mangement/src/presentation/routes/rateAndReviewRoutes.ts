import { Router } from "express";
import { jwtMiddleware } from "../../infrastructure/jwt/verifyToken";
import { createRateAndReviewController } from "../controllers/rateAndReview/create";
import { readRateAndReviewUserIdController } from "../controllers/rateAndReview/readByuserId";
import { readRateAndReviewCourseIdController } from "../controllers/rateAndReview/readByCourseId";

const router = Router();

router.post("/create", jwtMiddleware, createRateAndReviewController);
router.get("/read/courseId/:courseId", readRateAndReviewCourseIdController);
router.get("/read/:courseId", jwtMiddleware, readRateAndReviewUserIdController);

export default router;
