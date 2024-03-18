import { Item } from "@/item/domain/entities";
import { ItemRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { NotFoundError } from "@/shared/domain/exception";

type EditItemInput = {
	id: string;
	name?: string;
	price?: number;
};

type EditItemOutput = Item;

export class EditItemUsecase extends BaseUsecase implements Usecase<EditItemInput, EditItemOutput> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository
	) {
		super(logger);
	}

	async execute(input: EditItemInput): Promise<EditItemOutput> {
		this.logger.info({ input }, "Atualização de cadastro de item");
		const item = await this.itemRepository.findById(input.id);
		if (!item) throw new NotFoundError("Item não encontrado");
		item.update(input);
		await this.itemRepository.update(item);
		this.logger.info({ item }, "Item atualizado com sucesso");
		return item;
	}
}
