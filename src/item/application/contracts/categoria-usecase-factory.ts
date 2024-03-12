import { CadastrarCategoriaUsecase } from "@/item/application/usecase/categoria";
import { Log } from "@/shared/contracts";

export interface CategoriaUsecasesFactoryInterface {
	makeCadastrarCategoriaUsecase: (logger: Log) => CadastrarCategoriaUsecase;
}
