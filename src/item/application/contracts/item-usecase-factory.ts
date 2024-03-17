import { Log } from "@/shared/application/contracts";
import {
	BuscatItemPorCategoriaUsecase,
	CadastrarItemUsecase,
	DeletarItemUsecase,
	EditarItemUsecase
} from "../usecases/item";

export interface ItemUsecasesFactoryInterface {
	makeCadastrarItemUsecase: (logger: Log) => CadastrarItemUsecase;
	makeEditarItemUsecase: (logger: Log) => EditarItemUsecase;
	makeDeletarItemUsecase: (logger: Log) => DeletarItemUsecase;
	makeBuscarItemPorCategoriaUsecase: (logger: Log) => BuscatItemPorCategoriaUsecase;
}
