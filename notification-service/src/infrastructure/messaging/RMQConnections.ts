// import amqp, { Connection, Channel, Replies } from "amqplib";
// import dotenv from "dotenv";
// dotenv.config();

// let channel: Channel | null = null;

// const connectToRabbitMQ = async (): Promise<void> => {
//   try {
//     const connection: Connection = await amqp.connect(
//       process.env.RMQ_URL ?? "amqp://localhost"
//     );
//     channel = await connection.createChannel();
//     console.log("Connected to RabbitMQ");
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ:", error);
//     process.exit(1);
//   }
// };

// const createQueue = async (
//   queueName: string,
//   options = {}
// ): Promise<Replies.AssertQueue> => {
//   try {
//     if (channel) {
//       const queue = await channel.assertQueue(queueName, {
//         durable: true,
//         ...options,
//       });
//       console.log(`Queue ${queue.queue} created or retrieved successfully`);
//       return queue;
//     } else {
//       throw new Error("RabbitMQ channel is not initialized");
//     }
//   } catch (error) {
//     console.error(`Failed to create or retrieve queue ${queueName}:`, error);
//     throw error;
//   }
// };

// export { connectToRabbitMQ, createQueue, channel };

// src/infrastructure/messaging/RMQConnections.ts

// import amqp from "amqplib";

// let connection: amqp.Connection | null = null;
// let channel: amqp.Channel | null = null;

// export const connectToRabbitMQ = async () => {
//   connection = await amqp.connect(process.env.RMQ_URL ?? "amqp://localhost");
//   channel = await connection.createChannel();
// };

// export const createQueue = async (queue: string, options = {}) => {
//   if (!channel) {
//     throw new Error("Channel is not created. Call connectToRabbitMQ first.");
//   }
//   return channel.assertQueue(queue, options);
// };

// export { connection, channel };
// import amqp from "amqplib";

// let connection: amqp.Connection | null = null;
// let channel: amqp.Channel | null = null;

// const connectToRabbitMQ = async () => {
//   try {
//     connection = await amqp.connect(process.env.RMQ_URL ?? "amqp://localhost");
//     connection.on("error", (err) => {
//       console.error("RabbitMQ connection error:", err);
//       connection = null;
//       channel = null;
//     });
//     connection.on("close", () => {
//       console.log("RabbitMQ connection closed. Attempting to reconnect...");
//       connection = null;
//       channel = null;
//       setTimeout(connectToRabbitMQ, 5000); // Retry after 5 seconds
//     });

//     channel = await connection.createChannel();
//     channel.on("error", (err) => {
//       console.error("RabbitMQ channel error:", err);
//     });

//     console.log("Connected to RabbitMQ");
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ:", error);
//     setTimeout(connectToRabbitMQ, 5000); // Retry after 5 seconds
//   }
// };

// const createQueue = async (queue: string, options = {}) => {
//   if (!channel) {
//     throw new Error("Channel is not created. Call connectToRabbitMQ first.");
//   }
//   return channel.assertQueue(queue, options);
// };

// export { connectToRabbitMQ, createQueue, connection, channel };
