import { CreateOrderUsecase, GenerateQrCodeUsecaseDecorator } from "@/order/application/usecases";
import { Log } from "@/shared/application/contracts";

export interface OrderUsecasesFactoryInterface {
	makeCreateOrderUsecase: (logger: Log) => CreateOrderUsecase;
	makeCreateOrderWithMercadoPagoQrCodeUsecase: (logger: Log) => GenerateQrCodeUsecaseDecorator;
}
