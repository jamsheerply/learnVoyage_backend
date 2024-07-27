import { chatEntity } from "../../domain/entities/chatEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const updateChatByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { updateChatById },
  } = dependencies;
  return {
    execute: async (chatId: string, data: chatEntity) => {
      return await updateChatById(chatId, data);
    },
  };
};
