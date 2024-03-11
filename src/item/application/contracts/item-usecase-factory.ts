import { Log } from "@/shared/contracts";
import { CadastrarItemUsecase } from "../usecase/cadastrar-item";

export interface ItemUsecasesFactoryInterface {
	makeCadastrarItemUsecase: (logger: Log) => CadastrarItemUsecase;
}
