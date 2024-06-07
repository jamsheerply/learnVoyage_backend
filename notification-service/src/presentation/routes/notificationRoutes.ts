// src/presentation/routes/notificationRoutes.ts
import express from "express";
import { sendNotificationController } from "../controllers/notificationController";
import { sendNotification } from "../../application/services/notificationService";
import { nodemailerClient } from "../../infrastructure/email/nodemailerClient";

const router = express.Router();
const notificationService = sendNotification(nodemailerClient);

router.post("/notifications", sendNotificationController(notificationService));

export default router;
