import { Order } from "@/order/domain/entities/order";

export interface PaymentGateway {
	generateQrCode(order: Order): Promise<string>;
	getPaymentData(paymentId: string): Promise<GetPaymentData>;
}

type GetPaymentData = {
	paymentStatus: string;
	orderId: string;
};
