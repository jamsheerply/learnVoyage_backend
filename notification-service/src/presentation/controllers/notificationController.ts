// src/presentation/controllers/notificationController.ts
// src/presentation/controllers/notificationController.ts
import { Request, Response } from "express";
import { sendNotification } from "../../application/services/notificationService";
import { Notification } from "../../domain/entities/notification";

export const sendNotificationController =
  (notificationService: (notification: Notification) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      const notification: Notification = req.body;
      await notificationService(notification);
      res.status(200).send({ message: "Notification sent" });
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };
