import { Item } from "@/item/domain/entities";
import { CategoryRepository, ItemRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { AlreadyExistsError, NotFoundError } from "@/shared/domain/exception";

type CreateItemInput = {
	name: string;
	price: number;
	categoryId: string;
};

type CreateItemOutput = Item;

export class CreateItemUsecase extends BaseUsecase implements Usecase<CreateItemInput, CreateItemOutput> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository,
		private readonly categoryRepository: CategoryRepository
	) {
		super(logger);
	}

	async execute(input: CreateItemInput): Promise<CreateItemOutput> {
		this.logger.info({ input }, "Novo cadsatro de item");
		const itemAlreadyExists = await this.itemRepository.findByName(input.name);
		if (itemAlreadyExists) throw new AlreadyExistsError("Item já cadastrado");
		const category = await this.categoryRepository.findById(input.categoryId);
		if (!category) throw new NotFoundError("Categoria não encontrada");
		const item = Item.new({ ...input, category });
		await this.itemRepository.save(item);
		this.logger.info({ item }, "Item cadastrado com sucesso");
		return item;
	}
}
