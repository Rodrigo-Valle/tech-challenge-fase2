import { Validator } from "@/2-application/contracts";
import { RestOutput } from "@/2-application/contracts/controller";
import { CadastrarClienteUsecase } from "@/2-application/usecases";
import { CadastrarClienteDTO, cadastrarClienteSchema } from "@/3-infra/adapters/zod";
import { RestPresenter } from "../presenters";

export class RestClienteController {
	constructor(
		private readonly cadastrarClienteUsecase: CadastrarClienteUsecase,
		private readonly validator: Validator
	) {}

	async cadastrarCliente(input: unknown): Promise<RestOutput> {
		try {
			const dto = this.validator.validate<CadastrarClienteDTO>(input, cadastrarClienteSchema);
			const result = await this.cadastrarClienteUsecase.execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			console.error(`Erro ao cadastrar cliente: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
