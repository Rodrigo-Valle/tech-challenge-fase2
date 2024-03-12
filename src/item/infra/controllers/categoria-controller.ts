import { CategoriaUsecasesFactoryInterface } from "@/item/application/contracts";
import { CadastrarCategoriaDTO, cadastrarCategoriaSchema } from "@/item/infra/schemas/categoria";
import { Log, Validator } from "@/shared/contracts";
import { RestInput, RestOutput } from "@/shared/contracts/controller";
import { RestPresenter } from "@/shared/infra/presenters";

export class RestCategoriaController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: CategoriaUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async cadastrarCategoria(input: RestInput): Promise<RestOutput> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de categoria: ");
			const dto = this.validator.validate<CadastrarCategoriaDTO>(input.body, cadastrarCategoriaSchema);
			const result = await this.usecaseFactory.makeCadastrarCategoriaUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
