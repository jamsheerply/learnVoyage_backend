import { Router } from "express";
import { signinController } from "../controller/signinController";
import {
  signupController,
  verifyOtpController,
} from "../controller/signupController";
import { getAllInstructorsController } from "../controller/getAllInstructorsController";
import { editInstructorController } from "../controller/editInstructorController";
import authMiddleware from "../middlewares/authMiddleware";
import dotenv from "dotenv";
import roleMiddleware from "../middlewares/roleMiddleware";
dotenv.config();

const router = Router();

router.post("/signup", signupController);
router.post("/verify-otp", verifyOtpController);
router.post("/signin", signinController);
router.get(
  "/instructors",
  authMiddleware(process.env.JWT_SECRET || ""),
  roleMiddleware("admin"),
  getAllInstructorsController
);
router.patch(
  "/instructor/edit",
  authMiddleware(process.env.JWT_SECRET || ""),
  roleMiddleware("admin"),
  editInstructorController
);

export default router;
