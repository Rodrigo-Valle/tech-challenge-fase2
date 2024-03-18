import {
	CreateOrderUsecase,
	GenerateQrCodeUsecaseDecorator,
	GetPaymentDataUsecaseDecorator,
	UpdateOrderPaymentStatusUsecase
} from "@/order/application/usecases";
import { Log } from "@/shared/application/contracts";

export interface OrderUsecasesFactoryInterface {
	makeCreateOrderUsecase: (logger: Log) => CreateOrderUsecase;
	makeUpdateOrderPaymentStatusUsecase: (logger: Log) => UpdateOrderPaymentStatusUsecase;
	makeCreateOrderWithMercadoPagoQrCodeUsecase: (logger: Log) => GenerateQrCodeUsecaseDecorator;
	makeUpdateOrderPaymentStatusFromMercadoPagoUsecase: (logger: Log) => GetPaymentDataUsecaseDecorator;
}
