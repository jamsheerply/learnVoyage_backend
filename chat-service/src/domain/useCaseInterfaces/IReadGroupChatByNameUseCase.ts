import { chatEntity } from "../entities/chatEntity";

export interface IReadGroupChatByNameUseCase {
  execute(chatName: string): Promise<chatEntity | null>;
}
