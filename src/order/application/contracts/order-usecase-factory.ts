import {
	CreateOrderUsecase,
	GenerateQrCodeUsecaseDecorator,
	GetOrderOrderedByStatusUsecase,
	GetPaymentDataUsecaseDecorator,
	UpdateOrderPaymentStatusUsecase
} from "@/order/application/usecases";
import { Log } from "@/shared/application/contracts";

export interface OrderUsecasesFactoryInterface {
	makeCreateOrderUsecase: (logger: Log) => CreateOrderUsecase;
	makeUpdateOrderPaymentStatusUsecase: (logger: Log) => UpdateOrderPaymentStatusUsecase;
	makeGetOrderOrderedByStatusUsecase: (logger: Log) => GetOrderOrderedByStatusUsecase;
	makeCreateOrderWithMercadoPagoQrCodeUsecase: (logger: Log) => GenerateQrCodeUsecaseDecorator;
	makeUpdateOrderPaymentStatusFromMercadoPagoUsecase: (logger: Log) => GetPaymentDataUsecaseDecorator;
}
