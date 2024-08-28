import { AssessmentEntity } from "../../entities/assessmentEntity";

export interface IAssessmentRepository {
  createAssessment(
    createData: AssessmentEntity
  ): Promise<AssessmentEntity | null>;
  readAssessment(queryData: {
    userId: string;
    page: number;
    limit: number;
    search?: string;
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    assessments: AssessmentEntity[];
  } | null>;
  readAssessmentById(id: string): Promise<AssessmentEntity | null>;
  updateAssessment(
    assement: AssessmentEntity
  ): Promise<AssessmentEntity | null>;
  readAssessmentByCourseId(courseId: string): Promise<AssessmentEntity | null>;
}
