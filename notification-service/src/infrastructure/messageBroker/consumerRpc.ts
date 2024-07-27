import amqp, { Channel, Connection, Message } from "amqplib/callback_api";
import dotenv from "dotenv";
import { createUserHandler, exampleHandler } from "./handleRpc";
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

export const startConsumer = (queueName: string) => {
  amqp.connect(RMQ_URL, (error0: Error | null, connection: Connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1: Error | null, channel: Channel) => {
      if (error1) {
        throw error1;
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
    });
  });
};

registerHandler("createUser", createUserHandler);
