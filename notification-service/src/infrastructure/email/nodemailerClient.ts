import nodemailer from "nodemailer";
import { Notification } from "../../domain/entities/notification";
import { createEmailTemplate } from "./templetes/emailTemplates";
import dotenv from "dotenv";

dotenv.config();

export interface EmailClient {
  send(notification: Notification): Promise<void>;
}

export const createNodemailerClient = (): EmailClient => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const send = async (notification: Notification): Promise<void> => {
    console.log(notification);
    const mailOptions = {
      from: process.env.EMAIL,
      to: notification.recipientEmail,
      subject: notification.subject,
      html: createEmailTemplate(notification),
    };
    await transporter.sendMail(mailOptions);
  };
  console.log(JSON.stringify(send));
  return { send };
};

export const nodemailerClient = createNodemailerClient();
