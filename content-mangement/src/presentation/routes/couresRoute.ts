import { Router } from "express";
import { createCourseController } from "../controllers/course/create";
import { readAllCourseController } from "../controllers/course/readAll";
import { readByIdCourseController } from "../controllers/course/readById";
import { updateCourseController } from "../controllers/course/update";

const router = Router();

router.post("/create", createCourseController);
router.get("/read", readAllCourseController);
router.get("/read/:id", readByIdCourseController);
router.patch("/update", updateCourseController);

export default router;
