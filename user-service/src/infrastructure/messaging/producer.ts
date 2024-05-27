import { channel } from "./rMqConnectins";

const sendMessageToQueue = async (
  queueName: string,
  messageType: string,
  message: string
): Promise<void> => {
  try {
    if (channel) {
      await channel.assertQueue(queueName, { durable: true });
      const messageContent = JSON.stringify({
        type: messageType,
        payload: message,
      });
      await channel.sendToQueue(queueName, Buffer.from(messageContent), {
        persistent: true,
      });
      console.log(` [x] Sent ${messageType} message to queue ${queueName}`);
    } else {
      console.error("RabbitMQ channel is not initialized");
    }
  } catch (error) {
    console.error(`Failed to send message to queue ${queueName}:`, error);
  }
};

export { sendMessageToQueue };
