import { Router } from "express";
import { createCourseController } from "../controllers/course/create";
import { readAllCourseController } from "../controllers/course/readAll";
import { readByIdCourseController } from "../controllers/course/readById";
import { updateCourseController } from "../controllers/course/update";
import { jwtMiddleware } from "../../infrastructure/jwt/verifyToken";
import roleMiddleware from "../../_lib/roleMiddleware";
import { readCourseController } from "../controllers/course/read";
import { readCourseTotalCoursesController } from "../controllers/course/readTotalCourse";

const router = Router();

router.post(
  "/create",
  jwtMiddleware,
  roleMiddleware("instructor"),
  createCourseController
);
router.get("/read", readAllCourseController);
router.get("/read-filer", jwtMiddleware, readCourseController);
router.get(
  "/read/total-course",
  jwtMiddleware,
  readCourseTotalCoursesController
);
router.get("/read/:id", readByIdCourseController);
router.patch(
  "/update",
  jwtMiddleware,
  roleMiddleware("instructor") || roleMiddleware("admin"),
  updateCourseController
);

export default router;
