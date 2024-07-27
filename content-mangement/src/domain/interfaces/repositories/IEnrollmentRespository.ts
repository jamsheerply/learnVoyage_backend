import { EnrollmentEntity } from "../../entities/enrollmentEntity";
import { paymentEntity } from "../../entities/paymentEntity";

export interface IEnrollmentRepository {
  createEnrollment(
    enrollmentData: paymentEntity
  ): Promise<EnrollmentEntity | null>;

  updateEnrollment(
    enrollmentData: EnrollmentEntity
  ): Promise<EnrollmentEntity | null>;

  readEnrollment(queryData: {
    userId: string;
    page: number;
    limit: number;
    search?: string;
    category?: string[];
    instructor?: string[];
    price?: string[];
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    enrollments: EnrollmentEntity[];
  }>;
  getEnrollmentById(id: string): Promise<EnrollmentEntity | null>;
  getEnrollmentByCourseId(
    userId: string,
    courseId: string
  ): Promise<EnrollmentEntity | null>;
}
