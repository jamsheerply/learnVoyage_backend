import { chatEntity } from "../entities/chatEntity";

export interface IRemoveFromGroupChatUseCase {
  execute(chatId: string, userId: string): Promise<chatEntity | null>;
}
