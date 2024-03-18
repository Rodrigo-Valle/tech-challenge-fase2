import { Category } from "@/item/domain/entities";
import { CategoryRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { AlreadyExistsError } from "@/shared/domain/exception";

type CreateCategoryInput = {
	name: string;
};

type CreateCategoryOutput = Category;

export class CreateCategoryUsecase extends BaseUsecase implements Usecase<CreateCategoryInput, CreateCategoryOutput> {
	constructor(
		logger: Log,
		private readonly categoryRepository: CategoryRepository
	) {
		super(logger);
	}

	async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
		this.logger.info({ input }, "Novo cadastro de categoria");
		const categoryFound = await this.categoryRepository.findByName(input.name);
		if (categoryFound) throw new AlreadyExistsError("categoria já cadastrada");
		const category = Category.new({ ...input });
		await this.categoryRepository.save(category);
		this.logger.info({ category }, "categoria cadastrada com sucesso");
		return category;
	}
}
