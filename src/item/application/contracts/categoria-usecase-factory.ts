import { CadastrarCategoriaUsecase } from "@/item/application/usecases/categoria";
import { Log } from "@/shared/application/contracts";

export interface CategoriaUsecasesFactoryInterface {
	makeCadastrarCategoriaUsecase: (logger: Log) => CadastrarCategoriaUsecase;
}
