import { CustomError } from "../../../_lib/common/customError";
import { IEnrollmentRepository } from "../../../domain/interfaces/repositories/IEnrollmentRespository";

export const readTotalRevenueUseCase = (
  EnrollmentRepository: IEnrollmentRepository
) => {
  return async (mentorId: string): Promise<number | null> => {
    try {
      const totalRevenue = await EnrollmentRepository.readTotalRevenue(
        mentorId
      );
      return totalRevenue;
    } catch (error) {
      const customError = error as CustomError;
      throw new Error(customError?.message);
    }
  };
};
