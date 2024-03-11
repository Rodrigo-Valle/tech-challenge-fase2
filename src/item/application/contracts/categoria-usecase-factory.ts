import { Log } from "@/shared/contracts";
import { CadastrarCategoriaUsecase } from "../usecase";

export interface CategoriaUsecasesFactoryInterface {
	makeCadastrarCategoriaUsecase: (logger: Log) => CadastrarCategoriaUsecase;
}
