import { CriarPedidoUsecase, GerarQrCodeUsecaseDecorator } from "@/pedido/application/usecases";
import { Log } from "@/shared/application/contracts";

export interface PedidoUsecasesFactoryInterface {
	makeCriarPedidoUsecase: (logger: Log) => CriarPedidoUsecase;
	makeCriarPedidoComMercadoPagoQrCodeUsecase: (logger: Log) => GerarQrCodeUsecaseDecorator;
}
