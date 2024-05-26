import { Channel } from "amqplib";
import { channel } from "./rMqConnectins";

const sendMessageToQueue = async (
  queueName: string,
  message: string
): Promise<void> => {
  try {
    if (channel) {
      await channel.sendToQueue(queueName, Buffer.from(message));
      console.log(` [x] Sent ${message}`);
    } else {
      console.error("RabbitMQ channel is not initialized");
    }
  } catch (error) {
    console.error(`Failed to send message to queue ${queueName}:`, error);
  }
};

export { sendMessageToQueue };
