import { RestClienteController } from "@/cliente/infra/controllers/cliente-controller";
import { RestCategoriaController, RestItemController } from "@/item/infra/controllers";
import { RestPedidoController } from "@/pedido/infra/controllers";
import { PinoLogService } from "@/shared/infra/adapters/pino/pino-log-service";
import { ZodValidator } from "@/shared/infra/adapters/zod/zod-validator";
import { CategoriaUsecasesFactory, ClienteUsecasesFactory, ItemUsecasesFactory } from "../usecases";
import { PedidoUsecasesFactory } from "../usecases/pedido-usecase";

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

	static makeCategoriaController(requestId: string): RestCategoriaController {
		const logger = new PinoLogService(requestId);
		const categoriaUsecaseFactory = new CategoriaUsecasesFactory();
		const zodValidator = new ZodValidator();
		return new RestCategoriaController(logger, categoriaUsecaseFactory, zodValidator);
	}

	static makePedidoController(requestId: string): RestPedidoController {
		const logger = new PinoLogService(requestId);
		const pedidoUsecaseFactory = new PedidoUsecasesFactory();
		const zodValidator = new ZodValidator();
		return new RestPedidoController(logger, pedidoUsecaseFactory, zodValidator);
	}
}
