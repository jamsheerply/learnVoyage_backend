import { PopulatedResult, ResultEntity } from "../../entities/resultEntity";

export interface IResultRespository {
  createResult(resultData: ResultEntity): Promise<ResultEntity | null>;
  readResultByAssessmentId(
    userId: string,
    AssessmentId: string
  ): Promise<ResultEntity | null>;
  readResult(queryData: {
    userId?: string;
    page: number;
    limit: number;
    search?: string;
    filter?: "completed" | "failed" | "pending";
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    results: PopulatedResult[];
  } | null>;
  readResultExamsPassRate(
    userId: string
  ): Promise<{ passed: number; failed: number; pending: number } | null>;
}
