import { Message, Channel } from "amqplib/callback_api";
import { dependencies } from "../../_boot/dependencies";
import {
  createCourseUseCase,
  createUserUserCase,
} from "../../application/useCases";
import { userEntity } from "../../domain/entities/userEntity";
import { courseEntity } from "../../domain/entities/courseEntity";

export const createUserHandler = async (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());

  console.log(" [.] Received message:", content.data);

  const userData: userEntity = {
    _id: content.data._id,
    firstName: content.data.firstName,
    lastName: content.data.lastName,
    role: content.data.role,
  };
  const newUser = await createUserUserCase(dependencies).execute(userData);

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
export const createCourseHandler = async (msg: Message, channel: Channel) => {
  const content = JSON.parse(msg.content.toString());

  console.log(" [.] Received message:", content.data);

  const CourseData: courseEntity = {
    _id: content.data._id,
    courseName: content.data.courseName,
    courseThumbnailUrl: content.data.courseThumbnailUrl,
    mentorId: content.data.mentorId,
  };
  const newUser = await createCourseUseCase(dependencies).execute(CourseData);

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
