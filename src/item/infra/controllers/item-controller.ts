import { ItemUsecasesFactoryInterface } from "@/item/application/contracts";
import { Log, Validator } from "@/shared/contracts";
import { RestInput, RestOutput } from "@/shared/contracts/controller";
import { RestPresenter } from "@/shared/infra/presenters";
import { CadastrarItemDTO, EditarItemDTO, cadastrarItemSchema, editarItemSchema } from "../schemas";

export class RestItemController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: ItemUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async cadastrarItem(input: RestInput): Promise<RestOutput> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de item: ");
			const dto = this.validator.validate<CadastrarItemDTO>(input.body, cadastrarItemSchema);
			const result = await this.usecaseFactory.makeCadastrarItemUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async editarItem(input: RestInput): Promise<RestOutput> {
		try {
			this.logger.info(input, "Nova requisição de edição de cadastro de item: ");
			const dto = this.validator.validate<EditarItemDTO>({ ...input.params, ...input.body }, editarItemSchema);
			const result = await this.usecaseFactory.makeEditarItemUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
