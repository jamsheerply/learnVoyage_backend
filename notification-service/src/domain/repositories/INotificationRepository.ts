// src/domain/repositories/notificationRepository.ts
import { Notification } from "../entities/notification";

export interface INotificationRepository {
  save(notification: Notification): Promise<void>;
}
