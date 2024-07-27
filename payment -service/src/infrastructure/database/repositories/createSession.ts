import { CustomError } from "../../../_lib/common/customError";
import { sessionEntity } from "../../../domain/entities/sessionEntity";
import { SessionModel } from "../models";

export const createSession = async (
  data: sessionEntity
): Promise<sessionEntity | null> => {
  try {
    const newSession = await SessionModel.create(data);
    if (!newSession) {
      throw new Error("Session creation failed!");
    }
    return newSession;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
