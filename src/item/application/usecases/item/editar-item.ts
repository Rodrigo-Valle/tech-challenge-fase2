import { Item } from "@/item/domain/entities";
import { ItemRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { NotFoundError } from "@/shared/domain/exception";

type EditarItemInput = {
	id: string;
	nome?: string;
	preco?: number;
};

type EditarItemOutput = Item;

export class EditarItemUsecase extends BaseUsecase implements Usecase<EditarItemInput, EditarItemOutput> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository
	) {
		super(logger);
	}

	async execute(input: EditarItemInput): Promise<EditarItemOutput> {
		this.logger.info({ input }, "Atualização de cadastro de item");
		const item = await this.itemRepository.findById(input.id);
		if (!item) throw new NotFoundError("Item não encontrado");
		item.update(input);
		await this.itemRepository.update(item);
		this.logger.info({ item }, "Item atualizado com sucesso");
		return item;
	}
}
