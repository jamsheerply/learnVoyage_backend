import { Router } from "express";
import { jwtMiddleware } from "../../infrastructure/jwt/verifyToken";
import { createEnrollmentController } from "../controllers/enrollment/create";
import { readEnrollmentController } from "../controllers/enrollment/read";
import { getEnrollmentByIdController } from "../controllers/enrollment/getById";
import { getEnrollmentByCourseIdController } from "../controllers/enrollment/getByCourseId";
import { updateEnrollmentController } from "../controllers/enrollment/update";
import { readEnrollmentCompleteCourseController } from "../controllers/enrollment/readCompleteCourse";
import { readEnrollmentActivityController } from "../controllers/enrollment/readActivity";
import { readRecentEnrollmentController } from "../controllers/enrollment/readRecentEnrollment";
import { readTopCoursesController } from "../controllers/enrollment/readTopCourses";
import { readCoursesStatusController } from "../controllers/enrollment/readCoursesStatus";
import { readEnrollmentByInstructorIdController } from "../controllers/enrollment/readByInstructorId";
import { readTotalRevenueController } from "../controllers/enrollment/readTotalRevenue";
import { readTopEnrollmentController } from "../controllers/enrollment/readTopEnrollments";

const router = Router();

router.post("/create", jwtMiddleware, createEnrollmentController);
router.get("/read", jwtMiddleware, readEnrollmentController);
router.get(
  "/read/completed-course",
  jwtMiddleware,
  readEnrollmentCompleteCourseController
);
router.get("/read/activity", jwtMiddleware, readEnrollmentActivityController);
router.get(
  "/read/recent-enrollment",
  jwtMiddleware,
  readRecentEnrollmentController
);
router.get("/read/top-courses", readTopCoursesController);
router.get("/read/courses-status", jwtMiddleware, readCoursesStatusController);
router.get(
  "/read/total-enrollment",
  jwtMiddleware,
  readEnrollmentByInstructorIdController
);
router.get("/read/top-enrollment", jwtMiddleware, readTopEnrollmentController);
router.get("/read/total-revenue", jwtMiddleware, readTotalRevenueController);
router.get("/read/:id", jwtMiddleware, getEnrollmentByIdController);
router.get(
  "/readby/:courseId",
  jwtMiddleware,
  getEnrollmentByCourseIdController
);
router.patch("/update/:id", jwtMiddleware, updateEnrollmentController);

export default router;
