import { PinoLogService } from "@/3-infra/adapters/pino/pino-log-service";
import { ZodValidator } from "@/3-infra/adapters/zod/zod-validator";
import { RestClienteController } from "@/3-infra/controllers/cliente-controller";
import { ClienteUsecasesFactory } from "../usecases/cliente-usecase";

export class RestControllerFactory {
	static makeClienteController(requestId: string): RestClienteController {
		const logger = new PinoLogService(requestId);
		const usecaseFactories = new ClienteUsecasesFactory();
		const zodValidator = new ZodValidator();
		return new RestClienteController(logger, usecaseFactories, zodValidator);
	}
}
