"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/presentation/routes/notificationRoutes.ts
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controllers/notificationController");
const notificationService_1 = require("../../application/services/notificationService");
const nodemailerClient_1 = require("../../infrastructure/email/nodemailerClient");
const router = express_1.default.Router();
const notificationService = (0, notificationService_1.sendNotification)(nodemailerClient_1.nodemailerClient);
router.post("/notifications", (0, notificationController_1.sendNotificationController)(notificationService));
exports.default = router;
