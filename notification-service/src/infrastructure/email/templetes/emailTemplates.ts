import { Notification } from "../../../domain/entities/notification";
// import { createOfferTemplate } from "./offerTemplate";
import { createOtpTemplate } from "./otpTemplate";
// import { createMentorApplicationApprovedTemplate } from "./mentorApplicationApprovedTemplate";
// import { createMentorApplicationPendingTemplate } from "./mentorApplicationPendingTemplate";

export const createEmailTemplate = (notification: Notification): string => {
  switch (notification.type) {
    // case "offer":
    //   return createOfferTemplate(notification.message);
    case "otp":
      return createOtpTemplate(notification.message);
    // case "mentorApplicationApproved":
    //   return createMentorApplicationApprovedTemplate(notification.message);
    // case "mentorApplicationPending":
    //   return createMentorApplicationPendingTemplate(notification.message);
    default:
      return `<p>${notification.message}</p>`;
  }
};
