import amqp, { Connection, Channel } from "amqplib";
import dotenv from "dotenv";
dotenv.config();

let channel: Channel | null = null;

const connectToRabbitMQ = async (): Promise<void> => {
  try {
    const connection: Connection = await amqp.connect(
      process.env.RMQ_URL ?? "amqp://localhost"
    );
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    process.exit(1);
  }
};

const createQueue = async (queueName: string): Promise<void> => {
  try {
    if (channel) {
      await channel.assertQueue(queueName, { durable: true }); // Ensure durable is true
      console.log(`Queue ${queueName} created or retrieved successfully`);
    } else {
      console.error("RabbitMQ channel is not initialized");
    }
  } catch (error) {
    console.error(`Failed to create or retrieve queue ${queueName}:`, error);
  }
};

export { connectToRabbitMQ, createQueue, channel };
