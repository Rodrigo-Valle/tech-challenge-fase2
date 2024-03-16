import { PedidoUsecasesFactoryInterface } from "@/pedido/application/contracts/contracts";
import { Log, RestInput, RestOutput, Validator } from "@/shared/contracts";
import { RestPresenter } from "@/shared/infra/presenters";
import { CriarPedidoDTO, criarPedidoSchema } from "../schemas/pedido";

export class RestPedidoController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: PedidoUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async criarPedido(input: RestInput): Promise<RestOutput> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de item: ");
			const dto = this.validator.validate<CriarPedidoDTO>(input.body, criarPedidoSchema);
			const result = await this.usecaseFactory.makeCriarPedidoUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar Pedido: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
