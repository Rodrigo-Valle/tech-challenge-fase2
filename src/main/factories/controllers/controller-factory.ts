import { CustomerController } from "@/customer/infra/controllers";
import { CategoryController, ItemController } from "@/item/infra/controllers";
import { MercadoPagoWebHookController, OrderController } from "@/order/infra/controllers";
import { PinoLogAdapter } from "@/shared/infra/adapters/pino";
import { ZodValidatorAdapter } from "@/shared/infra/adapters/zod";
import {
	CategoryUsecasesFactory,
	CustomerUsecasesFactory,
	ItemUsecasesFactory,
	OrderUsecasesFactory
} from "../usecases";

export class RestControllerFactory {
	static makeCustomerController(requestId: string): CustomerController {
		const logger = new PinoLogAdapter(requestId);
		const customerUsecaseFactories = new CustomerUsecasesFactory();
		const zodValidator = new ZodValidatorAdapter();
		return new CustomerController(logger, customerUsecaseFactories, zodValidator);
	}

	static makeItemController(requestId: string): ItemController {
		const logger = new PinoLogAdapter(requestId);
		const itemUsecaseFactories = new ItemUsecasesFactory();
		const zodValidator = new ZodValidatorAdapter();
		return new ItemController(logger, itemUsecaseFactories, zodValidator);
	}

	static makeCategoryController(requestId: string): CategoryController {
		const logger = new PinoLogAdapter(requestId);
		const categoryUsecaseFactory = new CategoryUsecasesFactory();
		const zodValidator = new ZodValidatorAdapter();
		return new CategoryController(logger, categoryUsecaseFactory, zodValidator);
	}

	static makeOrderController(requestId: string): OrderController {
		const logger = new PinoLogAdapter(requestId);
		const orderUsecaseFactory = new OrderUsecasesFactory();
		const zodValidator = new ZodValidatorAdapter();
		return new OrderController(logger, orderUsecaseFactory, zodValidator);
	}

	static makeMercadoPagoWebHookController(requestId: string): MercadoPagoWebHookController {
		const logger = new PinoLogAdapter(requestId);
		const orderUsecaseFactory = new OrderUsecasesFactory();
		const zodValidator = new ZodValidatorAdapter();
		return new MercadoPagoWebHookController(logger, orderUsecaseFactory, zodValidator);
	}
}
