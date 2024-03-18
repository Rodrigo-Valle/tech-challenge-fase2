import { Log } from "@/shared/application/contracts";
import { CreateItemUsecase, DeleteItemUsecase, EditItemUsecase, FindByCategoryUsecase } from "../usecases/item";

export interface ItemUsecasesFactoryInterface {
	makeCreateItemUsecase: (logger: Log) => CreateItemUsecase;
	makeEditItemUsecase: (logger: Log) => EditItemUsecase;
	makeDeleteItemUsecase: (logger: Log) => DeleteItemUsecase;
	makeFindByCategoryUsecase: (logger: Log) => FindByCategoryUsecase;
}
