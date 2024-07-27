import { IDependencies } from "../interfaces/IDependencies";

export const removeFromGroupChatUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { removeFromGroupChat },
  } = dependencies;
  return {
    execute: async (chatId: string, userId: string) => {
      return await removeFromGroupChat(chatId, userId);
    },
  };
};
