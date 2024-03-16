import { CriarPedidoUsecase } from "@/pedido/application/usecases";
import { Log } from "@/shared/contracts";

export interface PedidoUsecasesFactoryInterface {
	makeCriarPedidoUsecase: (logger: Log) => CriarPedidoUsecase;
}
