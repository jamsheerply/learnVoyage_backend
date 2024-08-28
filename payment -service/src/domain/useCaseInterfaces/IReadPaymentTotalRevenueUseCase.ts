export interface IReadPaymentTotalRevenueUseCase {
  execute(): Promise<{ totalRevenue: number } | null>;
}
