"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleHandler = void 0;
// import { createUserUseCase } from "../../application/usecases";
const exampleHandler = (msg, channel) => {
    const content = JSON.parse(msg.content.toString());
    console.log(" [.] Received message:", content);
    const response = {
        success: true,
        data: `Processed ${content.data} with exampleHandler`,
        sender: "consumer",
        receiver: "producer",
    };
    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
};
exports.exampleHandler = exampleHandler;
// export const createUserHandler = async (msg: Message, channel: Channel) => {
//   const content = JSON.parse(msg.content.toString());
//   console.log(" [.] Received message:", content.data);
//   const newUser = await createUserUseCase(dependencies).execute(content.data);
//   const response = {
//     success: true,
//     data: newUser,
//     message: "successfully created",
//   };
//   channel.sendToQueue(
//     msg.properties.replyTo,
//     Buffer.from(JSON.stringify(response)),
//     {
//       correlationId: msg.properties.correlationId,
//     }
//   );
//   channel.ack(msg);
// };
