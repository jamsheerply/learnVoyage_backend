import { Message, Channel } from "amqplib/callback_api";
import { Notification } from "../../domain/entities/notification";
import { nodemailerClient } from "../email/nodemailerClient";

export const sentOtpHandler = async (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());
  console.log(" [.] Received message:", content);

  const notification: Notification = {
    recipientEmail: content.data.email,
    subject: "Send OTP for verification",
    message: content.data.message,
    type: "createOtpTemplate",
  };

  await nodemailerClient.send(notification);

  const response = {
    success: true,
    data: `Processed ${content.data.email} with sentOtpHandler`,
    message: "Successfully processed OTP",
  };

  channel.sendToQueue(
    msg.properties.replyTo,
    Buffer.from(JSON.stringify(response)),
    {
      correlationId: msg.properties.correlationId,
    }
  );
  channel.ack(msg);
};
