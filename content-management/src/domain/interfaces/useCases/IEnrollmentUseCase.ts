import { EnrollmentEntity } from "../../entities/enrollmentEntity";

export interface IEnrollmentUseCase {
  createEnrollmentUSeCase(
    EnrollmentData: EnrollmentEntity
  ): Promise<EnrollmentEntity | null>;
}
