import { ConsumeMessage } from "amqplib";
import { channel } from "./RMQConnectins";
import { handleConsumer } from "./handleConsumer";

const consumeMessages = async (queueName: string): Promise<void> => {
  if (channel) {
    await channel.assertQueue(queueName, { durable: true });

    console.log(`Waiting for messages in queue: ${queueName}...`);

    channel.consume(
      queueName,
      (message: ConsumeMessage | null) => {
        if (message) {
          const msgContent = JSON.parse(message.content.toString());
          console.log(`Received message: ${JSON.stringify(msgContent)}`);
          handleConsumer(msgContent.type, msgContent.payload);
          channel?.ack(message);
          console.log(`Acknowledged message: ${JSON.stringify(msgContent)}`);
        }
      },
      { noAck: false }
    );
  } else {
    console.error("RabbitMQ channel is not initialized");
  }
};

export { consumeMessages };
