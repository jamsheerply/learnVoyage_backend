import { Message, Channel } from "amqplib/callback_api";
import { dependencies } from "../../_boot/dependencies";
import {
  accessChatUseCase,
  addToGroupChatUseCase,
  createGroupChatUseCase,
  createMessageUseCase,
  createUserUseCase,
  readGroupChatByNameUseCase,
} from "../../application/usecases";

export const createUserHandler = async (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());

  // console.log(" [.] Received message:createUserHandler", content.data);

  const newUser = await createUserUseCase(dependencies).execute(content.data);
  const response = {
    success: true,
    data: newUser,
    message: "successfully created",
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

export const createChatWithAdmin = async (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());

  // console.log(" [.] Received message:createChatWithAdmin", content.data);

  const ChatWithAdmin = await accessChatUseCase(dependencies).execute(
    "6694bc2c0b5eac20cf0f49c8",
    content.data
  );
  if (ChatWithAdmin) {
    await createMessageUseCase(dependencies).execute(
      "6694bc2c0b5eac20cf0f49c8",
      ChatWithAdmin._id?.toString()!,
      "Hi! Thank you for joining Learn Voyage. Feel free to chat with me anytime in the future. Have a nice day!"
    );
  }
  const response = {
    success: true,
    data: ChatWithAdmin,
    message: "successfully created",
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

export const createGroupChat = async (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());

  console.log(" [.] Received message:createGroupChat", content.data);

  const createGropChat = await createGroupChatUseCase(dependencies).execute(
    content.data.courseName,
    [content.data.mentorId, "6694bc2c0b5eac20cf0f49c8"],
    "6694bc2c0b5eac20cf0f49c8"
  );
  if (createGropChat) {
    await createMessageUseCase(dependencies).execute(
      "6694bc2c0b5eac20cf0f49c8",
      createGropChat._id?.toString()!,
      `Hi ! Thank you for creating the course named ${content.data.courseName}. Continue your discussions! After enrollment, students can ask questions and clear their doubts within the community here.`
    );
  }
  const response = {
    success: true,
    data: createGropChat,
    message: "successfully created",
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

export const addToGroupChat = async (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());

  console.log(" [.] Received message:addToGroupChat::", content.data.data);

  console.log(
    "content.data.courseId.courseName",
    content.data?.data?.courseId?.courseName
  );

  const groupChat = await readGroupChatByNameUseCase(dependencies).execute(
    content.data?.data?.courseId?.courseName
  );
  console.log("groupChat", groupChat);
  if (groupChat?._id) {
    await addToGroupChatUseCase(dependencies).execute(
      groupChat._id?.toString(),
      content.data?.data?.userId
    );
  }

  const response = {
    success: true,
    data: "groupChat",
    message: "successfully created",
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
