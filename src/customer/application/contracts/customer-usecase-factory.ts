import { CreateCustomerUsecase, FindByCPFUsecase } from "@/customer/application/usecases";
import { Log } from "@/shared/application/contracts";

export interface CustomerUsecasesFactoryInterface {
	makeCreateCustomerUsecase: (logger: Log) => CreateCustomerUsecase;
	makeFindByCPFUsecase: (logger: Log) => FindByCPFUsecase;
}
