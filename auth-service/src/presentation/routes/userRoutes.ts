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
import { resendOtpController } from "../controller/resendOtpController";
import { isBlockedController } from "../controller/isBlockedController";
import { logoutController } from "../controller/logoutController";
dotenv.config();
const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY;
const REFRESH_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY;
const router = Router();

router.post("/signup", signupController);
router.post("/resend-otp", resendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/signin", signinController);
router.get("/logout", logoutController);
router.get("/isBlocked/:id", isBlockedController);
router.get(
  "/instructors",
  // authMiddleware(ACCESS_TOKEN_PRIVATE_KEY!, REFRESH_TOKEN_PRIVATE_KEY!),
  // roleMiddleware("admin"),
  getAllInstructorsController
);
router.patch(
  "/instructor/edit",
  // authMiddleware(ACCESS_TOKEN_PRIVATE_KEY!, REFRESH_TOKEN_PRIVATE_KEY!),
  // roleMiddleware("admin"),
  editInstructorController
);

export default router;
