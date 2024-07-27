import { IDependencies } from "../interfaces/IDependencies";

export const createMessageUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createMessage },
  } = dependencies;
  return {
    execute: async (currentUserId: string, chatId: string, content: string) => {
      return await createMessage(currentUserId, chatId, content);
    },
  };
};
