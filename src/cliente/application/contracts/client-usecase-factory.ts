import { BuscarClientePorCPFUsecase, CadastrarClienteUsecase } from "@/cliente/application/usecases";
import { Log } from "@/shared/contracts";

export interface ClienteUsecasesFactoryInterface {
	makeCadastrarClienteUsecase: (logger: Log) => CadastrarClienteUsecase;
	makeBuscarClientePorCpfUsecase: (logger: Log) => BuscarClientePorCPFUsecase;
}
