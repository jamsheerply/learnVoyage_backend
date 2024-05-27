import { IUser } from "../../domain/entities/user.entity";
import { sendMessageToQueue } from "../../infrastructure/messaging/producer";
import {
  channel,
  connectToRabbitMQ,
  createQueue,
} from "../../infrastructure/messaging/RMQConnectins";
import { generateCorrelationId } from "../../infrastructure/utility/correlationId";

export const signupService = async (userData: IUser) => {
  await connectToRabbitMQ();
  await createQueue("user-service");

  const correlationId = generateCorrelationId();
  const replyQueue = await createQueue("", { exclusive: true });

  // Listen for response messages
  const response = await new Promise((resolve, reject) => {
    channel?.consume(
      replyQueue.queue,
      (message) => {
        if (message?.properties.correlationId === correlationId) {
          const msgContent = JSON.parse(message.content.toString());

          channel?.ack(message);
          resolve(msgContent);
        }
      },
      { noAck: false }
    );

    // Send the signup message to the user-service
    sendMessageToQueue("user-service", "addUser", JSON.stringify(userData), {
      correlationId,
      replyTo: replyQueue.queue,
    }).catch(reject);
  });

  return response as IUser;
};
