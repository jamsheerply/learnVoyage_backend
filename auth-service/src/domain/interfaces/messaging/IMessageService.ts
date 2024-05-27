// domain/interfaces/messaging/IMessageService.ts
export interface IMessageService {
  connectToRabbitMQ(): Promise<void>;
  createQueue(queueName: string, options?: any): Promise<void>;
  sendMessage(
    queueName: string,
    msgType: string,
    message: string,
    options?: any
  ): Promise<void>;
  consume(
    queueName: string,
    onMessage: (msgType: string, message: string) => void
  ): Promise<void>;
}
