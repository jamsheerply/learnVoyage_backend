import { paymentEntityPop } from "../entities/paymentEntityPop";

export interface IDownloadTransationsUseCase {
  execute(
    startDate: string,
    endDate: string
  ): Promise<paymentEntityPop[] | null>;
}
