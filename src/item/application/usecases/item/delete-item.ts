import { ItemRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";

type DeleteItemInput = {
	id: string;
};

export class DeleteItemUsecase extends BaseUsecase implements Usecase<DeleteItemInput, void> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository
	) {
		super(logger);
	}

	async execute(input: DeleteItemInput): Promise<void> {
		this.logger.info({ input }, "Exclusão de item");
		await this.itemRepository.delete(input.id);
		this.logger.info({ input }, "Item deletado com sucesso");
	}
}
