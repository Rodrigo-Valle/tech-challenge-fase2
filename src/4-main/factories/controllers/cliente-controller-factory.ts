import { ZodValidator } from "@/3-infra/adapters/zod/zod-validator";
import { RestClienteController } from "@/3-infra/controllers/cliente-controller";
import { ClienteUsecasesFactory } from "../usecases/cliente-usecase";

export class RestControllerFactory {
	static makeClienteController(): RestClienteController {
		const usecase = ClienteUsecasesFactory.makeCadastrarClienteUsecase();
		const zodValidator = new ZodValidator();
		return new RestClienteController(usecase, zodValidator);
	}
}
