import { Router } from "express";
import { jwtMiddleware } from "../../infrastructure/jwt/verifyToken";
import { createResultController } from "../controllers/result/create";
import { readResultByAssessmentIdController } from "../controllers/result/readByAssessmentId";
import { readResultController } from "../controllers/result/read";
import { readResultExamPassRateController } from "../controllers/result/readExamPassRate";
import { updateResultController } from "../controllers/result/update";

const router = Router();
router.post("/create", jwtMiddleware, createResultController);
router.get(
  "/read/exam-pass-rate",
  jwtMiddleware,
  readResultExamPassRateController
);
router.get(
  "/read/assessmentId/:assessmentId",
  jwtMiddleware,
  readResultByAssessmentIdController
);
router.get("/read", jwtMiddleware, readResultController);
router.patch("/update/:id", jwtMiddleware, updateResultController);
export default router;
