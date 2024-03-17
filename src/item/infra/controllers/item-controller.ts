import { ItemUsecasesFactoryInterface } from "@/item/application/contracts";
import { Log, Validator } from "@/shared/application/contracts";
import { RestInput, RestOutput } from "@/shared/application/contracts/controller";
import { RestPresenter } from "@/shared/infra/presenters";
import {
	BuscarItemPorCategoriaDTO,
	CadastrarItemDTO,
	DeletarItemDTO,
	EditarItemDTO,
	buscarItemPorCategoriaSchema,
	cadastrarItemSchema,
	deletarItemSchema,
	editarItemSchema
} from "../schemas/item";

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
			this.logger.error(`Erro ao atualizar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async deletarItem(input: RestInput): Promise<RestOutput> {
		try {
			this.logger.info(input, "Nova requisição de exclusão de cadastro de item: ");
			const dto = this.validator.validate<DeletarItemDTO>(input.params, deletarItemSchema);
			await this.usecaseFactory.makeDeletarItemUsecase(this.logger).execute(dto);
			return RestPresenter.ok({ mensagem: `Item ${input.params.id} deletado com sucesso!` });
		} catch (error) {
			this.logger.error(`Erro ao deletar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async buscarItemPorCategoria(input: RestInput): Promise<RestOutput> {
		try {
			this.logger.info(input, "Nova requisição de exclusão de cadastro de item: ");
			const dto = this.validator.validate<BuscarItemPorCategoriaDTO>(input.params, buscarItemPorCategoriaSchema);
			const result = await this.usecaseFactory.makeBuscarItemPorCategoriaUsecase(this.logger).execute(dto);
			return RestPresenter.ok(result);
		} catch (error) {
			this.logger.error(`Erro ao deletar Item: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
