import { Log } from "@/shared/contracts";
import { CadastrarItemUsecase } from "../usecase";

export interface ItemUsecasesFactoryInterface {
	makeCadastrarItemUsecase: (logger: Log) => CadastrarItemUsecase;
}
