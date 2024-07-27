import { Message, Channel } from "amqplib/callback_api";
import { createEnrollmentUsecase } from "../../application/useCases/enrollment/createEnrollmentUseCase";
import { EnrollmentRepository } from "../database/repositories/enrollmentRepositoryImp";

export const createEnrollmentHandler = async (
  msg: Message,
  channel: Channel
) => {
  const content = JSON.parse(msg.content.toString());
  console.log(" [.] Received message:", content.data);

  const newEnrollment = await createEnrollmentUsecase(EnrollmentRepository)(
    content.data
  );

  const response = {
    success: true,
    data: newEnrollment,
    message: "successfully created enrollment",
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
