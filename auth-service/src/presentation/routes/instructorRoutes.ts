import { Router } from "express";
import { jwtMiddleware } from "../../infrastructure/security/jwt/verifyToken";
import { getAllInstructorsController } from "../controller/getAllInstructorsController";
import { editInstructorController } from "../controller/editInstructorController";

const router = Router();

router.get("/", jwtMiddleware, getAllInstructorsController);
router.patch("/edit", jwtMiddleware, editInstructorController);

export default router;
