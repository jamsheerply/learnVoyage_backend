import { Router } from "express";
import { signupController } from "../controller/signupController";

const router = Router();

router.post("/signup", signupController);

export default router;
