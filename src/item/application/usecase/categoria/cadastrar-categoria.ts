import { Categoria } from "@/item/domain/entities";
import { CategoriaRepository } from "@/item/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/contracts";
import { AlreadyExistsError } from "@/shared/exception";

type CadastrarCategoriaInput = {
	nome: string;
};

type CadastrarCategoriaOutput = Categoria;

export class CadastrarCategoriaUsecase
	extends BaseUsecase
	implements Usecase<CadastrarCategoriaInput, CadastrarCategoriaOutput>
{
	constructor(
		logger: Log,
		private readonly categoriaRepository: CategoriaRepository
	) {
		super(logger);
	}

	async execute(input: CadastrarCategoriaInput): Promise<CadastrarCategoriaOutput> {
		this.logger.info({ input }, "Novo cadastro de categoria");
		const categoriaAlreadyExists = await this.categoriaRepository.findByNome(input.nome);
		if (categoriaAlreadyExists) throw new AlreadyExistsError("Categoria já cadastrada");
		const categoria = Categoria.new({ ...input });
		await this.categoriaRepository.save(categoria);
		this.logger.info({ categoria }, "Categoria cadastrada com sucesso");
		return categoria;
	}
}
