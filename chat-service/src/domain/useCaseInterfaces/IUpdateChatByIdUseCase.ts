import { chatEntity } from "../entities/chatEntity";

export interface IUpdateChatById {
  execute(chatId: string, data: chatEntity): Promise<chatEntity | null>;
}
