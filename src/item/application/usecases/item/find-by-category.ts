import { Item } from "@/item/domain/entities";
import { ItemRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";

type FindByCategoryInput = {
	categoryId: string;
};

type FindByCategoryOutput = Item[];

export class FindByCategoryUsecase extends BaseUsecase implements Usecase<FindByCategoryInput, FindByCategoryOutput> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository
	) {
		super(logger);
	}

	async execute(input: FindByCategoryInput): Promise<FindByCategoryOutput> {
		this.logger.info({ input }, "Buscando item pela categoria");
		const items = await this.itemRepository.findByCategory(input.categoryId);
		this.logger.info({ items }, "Retornando items encontrados");
		return items;
	}
}
