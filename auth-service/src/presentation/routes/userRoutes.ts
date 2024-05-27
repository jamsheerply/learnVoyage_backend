import { Router } from "express";
import { signupController } from "../controller/signupController";
import { signinContoller } from "../controller/signinController";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signinContoller);

export default router;
