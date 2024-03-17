import { ItemRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";

type DeletarItemInput = {
	id: string;
};

export class DeletarItemUsecase extends BaseUsecase implements Usecase<DeletarItemInput, void> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository
	) {
		super(logger);
	}

	async execute(input: DeletarItemInput): Promise<void> {
		this.logger.info({ input }, "Exclusão de item");
		await this.itemRepository.delete(input.id);
		this.logger.info({ input }, "Item deletado com sucesso");
	}
}
