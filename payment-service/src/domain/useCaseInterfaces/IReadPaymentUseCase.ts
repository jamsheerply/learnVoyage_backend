import { paymentEntity } from "../entities/paymentEntity";

export interface IReadPaymentUseCase {
  execute(queryData: {
    page: number;
    limit: number;
    search?: string;
    method?: string[];
    status?: string[];
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    payments: paymentEntity[];
  } | null>;
}
