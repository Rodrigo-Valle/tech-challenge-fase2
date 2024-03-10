import { Log } from "@/2-application/contracts";
import { BuscarClientePorCPFUsecase, CadastrarClienteUsecase } from "@/2-application/usecases";

export interface ClienteUsecasesFactoryInterface {
	makeCadastrarClienteUsecase: (logger: Log) => CadastrarClienteUsecase;
	makeBuscarClientePorCpfUsecase: (logger: Log) => BuscarClientePorCPFUsecase;
}
