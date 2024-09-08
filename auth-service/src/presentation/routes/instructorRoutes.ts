import { Router } from "express";
import { jwtMiddleware } from "../../infrastructure/security/jwt/verifyToken";
import { getAllInstructorsController } from "../controller/getAllInstructorsController";
import { editInstructorController } from "../controller/editInstructorController";
import roleMiddleware from "../middlewares/roleMiddleware";
import { readIntructorController } from "../controller/readIntructorController";

const router = Router();

router.get("/", getAllInstructorsController);
router.patch(
  "/edit",
  jwtMiddleware,
  roleMiddleware("admin"),
  editInstructorController
);
router.get(
  "/read",
  jwtMiddleware,
  roleMiddleware("admin"),
  readIntructorController
);
export default router;
