"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailTemplate = void 0;
// import { createOfferTemplate } from "./offerTemplate";
const otpTemplate_1 = require("./otpTemplate");
// import { createMentorApplicationApprovedTemplate } from "./mentorApplicationApprovedTemplate";
// import { createMentorApplicationPendingTemplate } from "./mentorApplicationPendingTemplate";
const createEmailTemplate = (notification) => {
    switch (notification.type) {
        // case "offer":
        //   return createOfferTemplate(notification.message);
        case "otp":
            return (0, otpTemplate_1.createOtpTemplate)(notification.message);
        // case "mentorApplicationApproved":
        //   return createMentorApplicationApprovedTemplate(notification.message);
        // case "mentorApplicationPending":
        //   return createMentorApplicationPendingTemplate(notification.message);
        default:
            return `<p>${notification.message}</p>`;
    }
};
exports.createEmailTemplate = createEmailTemplate;
