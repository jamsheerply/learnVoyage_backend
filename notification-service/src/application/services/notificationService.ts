// src/application/services/notificationService.ts
// import { Notification } from "../../domain/entities/notification";
// import { INotificationRepository } from "../../domain/repositories/INotificationRepository";
// import { EmailClient } from "../../infrastructure/email/nodemailerClient";

// export const sendNotification =
//   (notificationRepository: INotificationRepository, emailClient: EmailClient) =>
//   async (notification: Notification) => {
//     await emailClient.send(notification);
//     // await notificationRepository.save(notification);
//   };

// src/application/services/notificationService.ts
import { Notification } from "../../domain/entities/notification";
import { EmailClient } from "../../infrastructure/email/nodemailerClient";

export const sendNotification =
  (emailClient: EmailClient) => async (notification: Notification) => {
    await emailClient.send(notification);
  };
