import { paymentEntity } from "../entities/paymentEntity";

export interface ICreatePaymentUseCase {
  execute(data: paymentEntity): Promise<paymentEntity | null>;
}
