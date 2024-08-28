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
  readCompleteCourse(
    courseId: string
  ): Promise<{ courseName: string; completedPercentage: number }[]>;
  readEnrollmentActivity(
    userId: string
  ): Promise<{ date: Date; exam: string; enrollment: string } | null>;
  readRecentEnrollment(userId: string): Promise<EnrollmentEntity[] | null>;
  readTopCourses(): Promise<EnrollmentEntity[] | null>;
  readCourseStatus(): Promise<EnrollmentEntity[] | null>;
}
