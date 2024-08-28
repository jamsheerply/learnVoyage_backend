import amqp, { Channel, Connection, Message } from "amqplib/callback_api";
import dotenv from "dotenv";
import {
  //  createUserHandler,
  exampleHandler,
} from "./handleRpc";
dotenv.config();

const RMQ_URL = process.env.RMQ_URL as string;

type MessageHandler = (msg: Message, channel: Channel) => void;
const handlers: { [key: string]: MessageHandler } = {};

export const registerHandler = (
  messageType: string,
  handler: MessageHandler
) => {
  handlers[messageType] = handler;
};

const connectWithRetry = (queueName: string, retries = 0) => {
  const maxRetries = 10;
  const retryDelay = Math.min(1000 * Math.pow(2, retries), 30000); // Exponential backoff with a max delay of 30 seconds

  amqp.connect(RMQ_URL, (error0: Error | null, connection: Connection) => {
    if (error0) {
      console.error(
        "Failed to connect to RabbitMQ, retrying in",
        retryDelay / 1000,
        "seconds:",
        error0.message
      );
      setTimeout(() => connectWithRetry(queueName, retries + 1), retryDelay);
      return;
    }

    console.log("Connected to RabbitMQ");
    connection.createChannel((error1: Error | null, channel: Channel) => {
      if (error1) {
        console.error(
          "Failed to create a channel, retrying in",
          retryDelay / 1000,
          "seconds:",
          error1.message
        );
        connection.close();
        setTimeout(() => connectWithRetry(queueName, retries + 1), retryDelay);
        return;
      }

      channel.assertQueue(queueName, {
        durable: false,
      });
      channel.prefetch(1);
      console.log(` [x] Awaiting RPC requests on queue: ${queueName}`);
      channel.consume(
        queueName,
        (msg: Message | null) => {
          if (msg) {
            const messageContent = msg.content.toString();
            const parsedContent = JSON.parse(messageContent);
            const handler = handlers[parsedContent.type];
            if (handler) {
              handler(msg, channel);
            } else {
              console.log(
                ` [x] No handler for message type: ${parsedContent.type}`
              );
              channel.ack(msg);
            }
          }
        },
        {
          noAck: false,
        }
      );

      // Handle connection errors
      connection.on("error", (err) => {
        console.error("Connection error:", err.message);
        channel.close(() => connection.close());
        setTimeout(() => connectWithRetry(queueName, retries + 1), retryDelay);
      });

      // Handle connection close
      connection.on("close", () => {
        console.error(
          "Connection closed, retrying in",
          retryDelay / 1000,
          "seconds"
        );
        setTimeout(() => connectWithRetry(queueName, retries + 1), retryDelay);
      });
    });
  });
};

export const startConsumer = (queueName: string) => {
  connectWithRetry(queueName);
};

// registerHandler("createUser", createUserHandler);
