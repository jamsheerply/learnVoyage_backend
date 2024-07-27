import { IDependencies } from "../interfaces/IDependencies";

export const addToGroupChatUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { addToGroupChat },
  } = dependencies;
  return {
    execute: async (chatId: string, userId: string) => {
      return await addToGroupChat(chatId, userId);
    },
  };
};
