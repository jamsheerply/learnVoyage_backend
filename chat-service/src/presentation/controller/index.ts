import { IDependencies } from "../../application/interfaces/IDependencies";
import { accessChatController } from "./accessChatController";
import { addToGroupController } from "./addToGroupController";
import { allMessageByIdController } from "./allMessageByIdController";
import { createGroupChatController } from "./createGroupChatController";
import { createMessageController } from "./createMessageController";
import { fetchChatsController } from "./fetchChatsController";
import { removeFromGroupController } from "./removeFromGroupChatController";
import { renameGroupChatController } from "./renameGroupChatController";
import { SearchUserController } from "./searchUsercontroller";

export const controllers = (dependencies: IDependencies) => {
  return {
    accessChat: accessChatController(dependencies),
    fetchChats: fetchChatsController(dependencies),
    createGroupChat: createGroupChatController(dependencies),
    renameGroupChat: renameGroupChatController(dependencies),
    addToGroupChat: addToGroupController(dependencies),
    removeFromGroupChat: removeFromGroupController(dependencies),
    searchUser: SearchUserController(dependencies),
    createMessage: createMessageController(dependencies),
    allMessageById: allMessageByIdController(dependencies),
  };
};
