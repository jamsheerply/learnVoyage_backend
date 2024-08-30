import { paymentEntity } from "../entities/paymentEntity";

export interface IUpdatePaymentUseCase {
  execute(data: paymentEntity): Promise<paymentEntity | null>;
}
