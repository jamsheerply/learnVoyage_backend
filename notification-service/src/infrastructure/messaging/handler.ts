import { nodemailerClient } from "../email/nodemailerClient";
import { Notification } from "../../domain/entities/notification";
import { v4 as uuidv4 } from "uuid";

export const handleNotification = async (notificationData: any) => {
  console.log(notificationData);
  const notification: Notification = {
    id: uuidv4(),
    recipientEmail: notificationData.email,
    subject: notificationData.subject || "Notification",
    message: notificationData.message,
    type: notificationData.type,
  };
  await nodemailerClient.send(notification);
};
