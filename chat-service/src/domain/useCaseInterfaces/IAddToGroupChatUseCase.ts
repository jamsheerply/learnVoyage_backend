import { chatEntity } from "../entities/chatEntity";

export interface IAddToGroupChatUseCase {
  execute(chatId: string, userId: string): Promise<chatEntity | null>;
}
