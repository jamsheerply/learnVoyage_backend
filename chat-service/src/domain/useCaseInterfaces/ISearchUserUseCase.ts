import { userEntity } from "../entities/userEntity";

export interface ISearchUserUseCase {
  execute(keyword: string, currentUserId: string): Promise<userEntity[] | null>;
}
