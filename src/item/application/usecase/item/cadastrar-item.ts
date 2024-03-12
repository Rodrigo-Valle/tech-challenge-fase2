import { Item } from "@/item/domain/entities";
import { CategoriaRepository, ItemRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/contracts";
import { AlreadyExistsError, NotFoundError } from "@/shared/exception";

type CadastrarItemInput = {
	nome: string;
	preco: number;
	idCategoria: string;
};

type CadastrarItemOutput = Item;

export class CadastrarItemUsecase extends BaseUsecase implements Usecase<CadastrarItemInput, CadastrarItemOutput> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository,
		private readonly categoriaRepository: CategoriaRepository
	) {
		super(logger);
	}

	async execute(input: CadastrarItemInput): Promise<CadastrarItemOutput> {
		this.logger.info({ input }, "Novo cadsatro de item");
		const itemAlreadyExists = await this.itemRepository.findByNome(input.nome);
		if (itemAlreadyExists) throw new AlreadyExistsError("Item já cadastrado");
		const categoria = await this.categoriaRepository.findById(input.idCategoria);
		if (!categoria) throw new NotFoundError("Categoria não encontrada");
		const item = Item.new({ ...input, categoria });
		await this.itemRepository.save(item);
		this.logger.info({ item }, "Item cadastrado com sucesso");
		return item;
	}
}
