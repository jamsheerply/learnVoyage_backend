import amqp, { Channel, Connection, Message } from "amqplib/callback_api";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const RMQ_URL = process.env.RMQ_URL as string;

const pendingRequests: { [key: string]: (response: any) => void } = {};

export const sendMessage = (
  queueName: string,
  message: object,
  callback: (response: any) => void
) => {
  console.log("Starting to send message...");

  amqp.connect(RMQ_URL, (error0: Error | null, connection: Connection) => {
    if (error0) {
      throw error0;
    }

    connection.createChannel((error1: Error | null, channel: Channel) => {
      if (error1) {
        throw error1;
      }

      const correlationId = uuidv4();
      const replyQueue = "amq.rabbitmq.reply-to";

      pendingRequests[correlationId] = callback;

      channel.assertQueue(queueName, {
        durable: false,
      });

      // Consume messages from the reply queue
      channel.consume(
        replyQueue,
        (msg: Message | null) => {
          if (msg && msg.properties.correlationId === correlationId) {
            console.log(" [.] Got response:", msg.content.toString());
            pendingRequests[correlationId](JSON.parse(msg.content.toString()));
            delete pendingRequests[msg.properties.correlationId];
            if (Object.keys(pendingRequests).length === 0) {
              connection.close();
            }
          }
        },
        {
          noAck: true,
        },
        (consumeError, _ok) => {
          if (consumeError) {
            throw consumeError;
          }

          // Send the message to the queue after consuming is set up
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            correlationId,
            replyTo: replyQueue,
          });

          console.log(
            `Sent message to queue ${queueName} with correlationId ${correlationId}`
          );
        }
      );
    });
  });
};
