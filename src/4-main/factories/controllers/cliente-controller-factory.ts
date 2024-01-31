import { ZodValidator } from "@/3-infra/adapters/zod/zod-validator";
import { ClienteController } from "@/3-infra/controllers/cliente-controller";
import { ClienteUsecasesFactory } from "../usecases/cliente-usecase";

export class RestControllerFactory {
	static makeClienteController(): ClienteController {
		const usecase = ClienteUsecasesFactory.makeCadastrarClienteUsecase();
		const zodValidator = new ZodValidator();
		return new ClienteController(usecase, zodValidator);
	}
}
