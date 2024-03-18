import { ItemUsecasesFactoryInterface } from "@/item/application/contracts";
import { Log, Validator } from "@/shared/application/contracts";
import { Input, Output } from "@/shared/application/contracts/controller";
import { RestPresenter } from "@/shared/infra/presenters";
import {
	CreateItemDTO,
	DeleteItemDTO,
	EditItemDTO,
	FindByCategoryDTO,
	createItemSchema,
	deleteItemSchema,
	editItemSchema,
	findByCategorySchema
} from "../schemas/item";

export class ItemController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: ItemUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async CreateItem(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de item: ");
			const dto = this.validator.validate<CreateItemDTO>(input.body, createItemSchema);
			const result = await this.usecaseFactory.makeCreateItemUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async EditItem(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de edição de cadastro de item: ");
			const dto = this.validator.validate<EditItemDTO>({ ...input.params, ...input.body }, editItemSchema);
			const result = await this.usecaseFactory.makeEditItemUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao atualizar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async DeleteItem(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de exclusão de cadastro de item: ");
			const dto = this.validator.validate<DeleteItemDTO>(input.params, deleteItemSchema);
			await this.usecaseFactory.makeDeleteItemUsecase(this.logger).execute(dto);
			return RestPresenter.ok({ mensagem: `Item ${input.params.id} deletado com sucesso!` });
		} catch (error) {
			this.logger.error(`Erro ao deletar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async FindByCategory(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de exclusão de cadastro de item: ");
			const dto = this.validator.validate<FindByCategoryDTO>(input.params, findByCategorySchema);
			const result = await this.usecaseFactory.makeFindByCategoryUsecase(this.logger).execute(dto);
			return RestPresenter.ok(result.map((item) => item.toJson()));
		} catch (error) {
			this.logger.error(`Erro ao deletar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
