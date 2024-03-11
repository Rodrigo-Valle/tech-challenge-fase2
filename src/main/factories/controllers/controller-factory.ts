import { RestClienteController } from "@/cliente/infra/controllers/cliente-controller";
import { RestItemController } from "@/item/infra/controllers";
import { PinoLogService } from "@/shared/infra/adapters/pino/pino-log-service";
import { ZodValidator } from "@/shared/infra/adapters/zod/zod-validator";
import { ClienteUsecasesFactory, ItemUsecasesFactory } from "../usecases";

export class RestControllerFactory {
	static makeClienteController(requestId: string): RestClienteController {
		const logger = new PinoLogService(requestId);
		const clientUsecaseFactories = new ClienteUsecasesFactory();
		const zodValidator = new ZodValidator();
		return new RestClienteController(logger, clientUsecaseFactories, zodValidator);
	}

	static makeItemController(requestId: string): RestItemController {
		const logger = new PinoLogService(requestId);
		const itemUsecaseFactories = new ItemUsecasesFactory();
		const zodValidator = new ZodValidator();
		return new RestItemController(logger, itemUsecaseFactories, zodValidator);
	}
}
