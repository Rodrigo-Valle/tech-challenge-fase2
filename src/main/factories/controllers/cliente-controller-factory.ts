import { RestClienteController } from "@/cliente/infra/controllers/cliente-controller";
import { PinoLogService } from "@/shared/infra/adapters/pino/pino-log-service";
import { ZodValidator } from "@/shared/infra/adapters/zod/zod-validator";
import { ClienteUsecasesFactory } from "../usecases/cliente-usecase";

export class RestControllerFactory {
	static makeClienteController(requestId: string): RestClienteController {
		const logger = new PinoLogService(requestId);
		const usecaseFactories = new ClienteUsecasesFactory();
		const zodValidator = new ZodValidator();
		return new RestClienteController(logger, usecaseFactories, zodValidator);
	}
}
