// src/infrastructure/messaging/producer.ts
import { channel } from "./RMQConnections";

export const sendMessageToQueue = async (
  queue: string,
  message: string,
  options = {}
) => {
  if (!channel) {
    throw new Error("Channel is not created. Call connectToRabbitMQ first.");
  }
  return channel.sendToQueue(queue, Buffer.from(message), options);
};
