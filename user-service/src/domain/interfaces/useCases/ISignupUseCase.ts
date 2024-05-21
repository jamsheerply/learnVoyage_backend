import { IUser } from "../../entities/user.entity";

export interface ISignupUseCase {
  execute(UserData: IUser): Promise<IUser | null>;
}
