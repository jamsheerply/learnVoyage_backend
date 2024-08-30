import { sessionEntity } from "../entities/sessionEntity";

export interface ICreateSessionUseCase {
  execute(data: sessionEntity): Promise<sessionEntity | null>;
}
