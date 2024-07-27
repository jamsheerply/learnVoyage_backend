import { Message, Channel } from "amqplib/callback_api";

export const exampleHandler = (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());
  console.log(" [.] Received message:", content);
  const response = {
    success: true,
    data: `Processed ${content.data} with exampleHandler`,
    sender: "consumer",
    receiver: "producer",
  };
  channel.sendToQueue(
    msg.properties.replyTo,
    Buffer.from(JSON.stringify(response)),
    {
      correlationId: msg.properties.correlationId,
    }
  );
  channel.ack(msg);
};
export const createUserHandler = (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());
  console.log(" [.] Received message:", content);
  const response = {
    success: true,
    data: `Processed ${content.data} with exampleHandler`,
    message: "suceessfully created",
  };
  channel.sendToQueue(
    msg.properties.replyTo,
    Buffer.from(JSON.stringify(response)),
    {
      correlationId: msg.properties.correlationId,
    }
  );
  channel.ack(msg);
};
