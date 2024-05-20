import { Iuser } from "../../../../domain/entities/user.entity";
import User from "../model/userSchema";
export const signup = async (data: Iuser): Promise<Iuser | null> => {
  try {
    if (!data) {
      return null;
    }
    const user = await User.create(data);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
