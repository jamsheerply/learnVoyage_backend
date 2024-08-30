import { CustomError } from "../../../_lib/common/customError";
import { sessionEntity } from "../../../domain/entities/sessionEntity";
import { SessionModel } from "../models";

export const getSessionById = async (
  id: string
): Promise<sessionEntity | null> => {
  try {
    const session = await SessionModel.findById(id);
    if (!session) {
      throw new Error("Session not found");
    }
    return session;
  } catch (error) {
    const customError = error as CustomError;
    throw new Error(customError?.message);
  }
};
