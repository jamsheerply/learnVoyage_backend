import { Router } from "express";
import { jwtMiddleware } from "../../infrastructure/security/jwt/verifyToken";
import { getAllInstructorsController } from "../controller/getAllInstructorsController";
import { editInstructorController } from "../controller/editInstructorController";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", getAllInstructorsController);
router.patch(
  "/edit",
  jwtMiddleware,
  roleMiddleware("admin"),
  editInstructorController
);

export default router;
