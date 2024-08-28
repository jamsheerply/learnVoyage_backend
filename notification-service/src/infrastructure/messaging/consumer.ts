// import { channel } from "./RMQConnections";
// import { handleNotification } from "./handler";

// export const consumeMessages = async (queueName: string) => {
//   if (!channel) {
//     throw new Error("Channel is not created. Call connectToRabbitMQ first.");
//   }

//   channel.consume(
//     queueName,
//     async (msg) => {
//       if (msg !== null) {
//         const notification = JSON.parse(msg.content.toString());
//         await handleNotification(notification);
//         channel?.ack(msg);
//       }
//     },
//     { noAck: false }
//   );
// };
