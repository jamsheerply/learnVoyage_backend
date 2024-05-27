import { ConsumeMessage } from "amqplib";
import { channel } from "./rMqConnectins";
import { handleConsumer } from "./handleConsumer";

const consumeMessages = async (queueName: string): Promise<void> => {
  if (channel) {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Waiting for messages in queue: ${queueName}...`);

    channel.consume(
      queueName,
      async (message: ConsumeMessage | null) => {
        if (message) {
          try {
            const msgContent = JSON.parse(message.content.toString());
            console.log(`Received message: ${JSON.stringify(msgContent)}`);
            console.log(
              `Message properties: ${JSON.stringify(message.properties)}`
            );

            await handleConsumer(
              msgContent.type,
              msgContent.payload,
              message.properties
            );

            channel?.ack(message);
            console.log(`Acknowledged message: ${JSON.stringify(msgContent)}`);
          } catch (error: any) {
            console.error(`Error processing message: ${error.message}`);
            channel?.nack(message, false, false); // Negative acknowledge the message without requeuing it
          }
        }
      },
      { noAck: false }
    );
  } else {
    console.error("RabbitMQ channel is not initialized");
  }
};

export { consumeMessages };
