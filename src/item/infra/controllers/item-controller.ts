import { ItemUsecasesFactoryInterface } from "@/item/application/contracts";
import { Log, Validator } from "@/shared/contracts";
import { RestInput, RestOutput } from "@/shared/contracts/controller";
import { RestPresenter } from "@/shared/infra/presenters";
import { CadastrarItemDTO, cadastrarItemSchema } from "../schemas";

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
}
