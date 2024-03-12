import { Item } from "@/item/domain/entities";
import { ItemRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/contracts";

type BuscatItemPorCategoriaInput = {
	idCategoria: string;
};

type BuscatItemPorCategoriaOutput = Item[];

export class BuscatItemPorCategoriaUsecase
	extends BaseUsecase
	implements Usecase<BuscatItemPorCategoriaInput, BuscatItemPorCategoriaOutput>
{
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository
	) {
		super(logger);
	}

	async execute(input: BuscatItemPorCategoriaInput): Promise<BuscatItemPorCategoriaOutput> {
		this.logger.info({ input }, "Buscando item pela categoria");
		const items = await this.itemRepository.findByCategoria(input.idCategoria);
		this.logger.info({ items }, "Retornando items encontrados");
		return items;
	}
}
