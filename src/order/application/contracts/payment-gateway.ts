import { Order } from "@/order/domain/entities/order";

export interface PaymentGateway {
	generateQrCode(order: Order): Promise<string>;
}
