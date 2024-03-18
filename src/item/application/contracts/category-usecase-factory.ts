import { CreateCategoryUsecase } from "@/item/application/usecases/categoria";
import { Log } from "@/shared/application/contracts";

export interface CategoryUsecasesFactoryInterface {
	makeCreateCategoryUsecase: (logger: Log) => CreateCategoryUsecase;
}
