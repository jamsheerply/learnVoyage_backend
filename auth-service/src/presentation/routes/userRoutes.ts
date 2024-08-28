import { Router } from "express";
import { signinController } from "../controller/signinController";
import {
  signupController,
  verifyOtpController,
} from "../controller/signupController";
import dotenv from "dotenv";
import { resendOtpController } from "../controller/resendOtpController";
import { isBlockedController } from "../controller/isBlockedController";
import { logoutController } from "../controller/logoutController";
import { jwtMiddleware } from "../../infrastructure/security/jwt/verifyToken";
import { getProfileByIdController } from "../controller/getProfileByIdController";
import { updateProfileController } from "../controller/updateProfileController";
import { readTotalStudentsAndInstructorsController } from "../controller/readTotalStudentsAndInstructorsController";
import { getAllStudentsController } from "../controller/getAllStudentsController";
dotenv.config();
const router = Router();

router.post("/signup", signupController);
router.post("/resend-otp", jwtMiddleware, resendOtpController);
router.post("/verify-otp", jwtMiddleware, verifyOtpController);
router.post("/signin", signinController);
router.get("/logout", logoutController);
router.get("/isBlocked/:id", jwtMiddleware, isBlockedController);
router.get("/profile/:id", jwtMiddleware, getProfileByIdController);
router.patch("/update-profile", jwtMiddleware, updateProfileController);
router.get("/readAllStudents", getAllStudentsController);
router.get(
  "/read/total-students-and-instructors",
  jwtMiddleware,
  readTotalStudentsAndInstructorsController
);

export default router;
