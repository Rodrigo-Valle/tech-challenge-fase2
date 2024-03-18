import { CategoryUsecasesFactoryInterface } from "@/item/application/contracts";
import { CreateCategoryDTO, createCategorySchema } from "@/item/infra/schemas/categoria";
import { Log, Validator } from "@/shared/application/contracts";
import { Input, Output } from "@/shared/application/contracts/controller";
import { RestPresenter } from "@/shared/infra/presenters";

export class CategoryController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: CategoryUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async CreateCategory(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de categoria: ");
			const dto = this.validator.validate<CreateCategoryDTO>(input.body, createCategorySchema);
			const result = await this.usecaseFactory.makeCreateCategoryUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
