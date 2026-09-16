export interface CreateOrderCommandDTO {
  readonly orderId: string;
  readonly customerId: string;
  readonly sourceSystem: 'SHOPIFY' | 'WOOCOMMERCE' | 'CUSTOM_API';
  readonly items: Array<{
    readonly productId: string;
    readonly quantity: number;
    readonly unitPrice: number;
  }>;
  readonly totalAmount: number;
  readonly currency: string;
  readonly idempotencyKey: string;
}

export interface OrderSagaStatus {
  readonly sagaId: string;
  readonly correlationId: string;
  readonly status: 'PENDING' | 'PAYMENT_AUTHORIZED' | 'COMPLETED' | 'COMPENSATED';
  readonly currentStep: string;
  readonly createdAt: string;
}

export interface IOrderSagaOrchestratorContract {
  executeSaga(command: CreateOrderCommandDTO): Promise<OrderSagaStatus>;
  handlePaymentResponse(paymentEvent: any): Promise<void>;
  compensateFailedOrder(orderId: string, reason: string): Promise<void>;
}
