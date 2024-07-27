import { chatEntity } from "../../domain/entities/chatEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const accessChatUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { accessChat },
  } = dependencies;
  return {
    execute: async (userId: string, currentUserId: string) => {
      return await accessChat(userId, currentUserId);
    },
  };
};
