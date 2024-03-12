import { Log } from "@/shared/contracts";
import { CadastrarItemUsecase, DeletarItemUsecase, EditarItemUsecase } from "../usecase";

export interface ItemUsecasesFactoryInterface {
	makeCadastrarItemUsecase: (logger: Log) => CadastrarItemUsecase;
	makeEditarItemUsecase: (logger: Log) => EditarItemUsecase;
	makeDeletarItemUsecase: (logger: Log) => DeletarItemUsecase;
}
