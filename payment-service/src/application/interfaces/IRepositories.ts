import { paymentEntity } from "../../domain/entities/paymentEntity";
import { sessionEntity } from "../../domain/entities/sessionEntity";

export interface IRepositories {
  createPayment: (data: paymentEntity) => Promise<paymentEntity | null>;
  updatePayment: (data: paymentEntity) => Promise<paymentEntity | null>;
  createSession: (data: sessionEntity) => Promise<sessionEntity | null>;
  getSessionById: (id: string) => Promise<sessionEntity | null>;
  readPayment: (queryData: {
    page: number;
    limit: number;
    search?: string;
    method?: string[];
    status?: string[];
  }) => Promise<{
    total: number;
    page: number;
    limit: number;
    payments: paymentEntity[];
  } | null>;
  readPaymentTotalRevene: () => Promise<{ totalRevenue: number } | null>;
}
