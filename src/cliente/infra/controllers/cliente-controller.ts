import { ClienteUsecasesFactoryInterface } from "@/cliente/application/contracts";
import {
	BuscarClientePorCpfDTO,
	CadastrarClienteDTO,
	buscarClientePorCpfSchema,
	cadastrarClienteSchema
} from "@/cliente/infra/schemas";
import { Log, Validator } from "@/shared/contracts";
import { RestInput, RestOutput } from "@/shared/contracts/controller";

import { RestPresenter } from "@/shared/infra/presenters";
export class RestClienteController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: ClienteUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async cadastrarCliente(input: RestInput): Promise<RestOutput> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de cliente: ");
			const dto = this.validator.validate<CadastrarClienteDTO>(input.body, cadastrarClienteSchema);
			const result = await this.usecaseFactory.makeCadastrarClienteUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar cliente: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async buscarClientePorCPF(input: RestInput): Promise<RestOutput> {
		try {
			this.logger.info(input, "Nova requisição de busca de cliente por CPF: ");
			const dto = this.validator.validate<BuscarClientePorCpfDTO>(input.params, buscarClientePorCpfSchema);
			const result = await this.usecaseFactory.makeBuscarClientePorCpfUsecase(this.logger).execute(dto);
			return RestPresenter.ok(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao buscar cliente por CPF: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
