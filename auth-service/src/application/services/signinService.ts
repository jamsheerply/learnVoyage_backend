import { generateCorrelationId } from "../../infrastructure/utility/correlationId";
import { sendMessageToQueue } from "../../infrastructure/messaging/producer";
import { IUser } from "../../domain/entities/user.entity";
import {
  channel,
  connectToRabbitMQ,
  createQueue,
} from "../../infrastructure/messaging/RMQConnections";

export const signinService = async (userData: {
  email: string;
  password: string;
}) => {
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

    //send the signup message to the user-service
    sendMessageToQueue("user-service", "loginUser", JSON.stringify(userData), {
      correlationId,
      replyTo: replyQueue.queue,
    }).catch(reject);
  });
  console.log(response);
  console.log("response ");
  return response as IUser;
};
