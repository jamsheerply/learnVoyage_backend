"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupController_1 = require("../controller/signupController");
const router = (0, express_1.Router)();
router.post("/signup", signupController_1.signupController);
exports.default = router;
