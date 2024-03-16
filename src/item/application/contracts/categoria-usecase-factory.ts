import { CadastrarCategoriaUsecase } from "@/item/application/usecases/categoria";
import { Log } from "@/shared/contracts";

export interface CategoriaUsecasesFactoryInterface {
	makeCadastrarCategoriaUsecase: (logger: Log) => CadastrarCategoriaUsecase;
}
