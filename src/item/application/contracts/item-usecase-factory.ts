import { Log } from "@/shared/contracts";
import { CadastrarItemUsecase, EditarItemUsecase } from "../usecase";

export interface ItemUsecasesFactoryInterface {
	makeCadastrarItemUsecase: (logger: Log) => CadastrarItemUsecase;
	makeEditarItemUsecase: (logger: Log) => EditarItemUsecase;
}
