import { channel } from "./RMQConnections";

const sendMessageToQueue = async (
  queueName: string,
  msgType: string,
  message: string,
  options: any = {}
): Promise<void> => {
  try {
    if (channel) {
      const msgContent = JSON.stringify({ type: msgType, payload: message });
      await channel.sendToQueue(queueName, Buffer.from(msgContent), options);
      console.log(`Sent message to queue ${queueName}: ${msgContent}`);
    } else {
      console.error("RabbitMQ channel is not initialized");
    }
  } catch (error) {
    console.error(`Failed to send message to queue ${queueName}:`, error);
  }
};

export { sendMessageToQueue };
