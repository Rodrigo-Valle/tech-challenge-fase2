import { Cliente } from "@/cliente/domain/entities/cliente";
import { ClienteRepository } from "@/cliente/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/contracts";
import { AlreadyExistsError } from "@/shared/exception";

type CadastrarClienteInput = {
	nome: string;
	email: string;
	cpf: string;
};

type CadastrarClienteOutput = Cliente;

export class CadastrarClienteUsecase
	extends BaseUsecase
	implements Usecase<CadastrarClienteInput, CadastrarClienteOutput>
{
	constructor(
		logger: Log,
		private readonly clienteRepository: ClienteRepository
	) {
		super(logger);
	}

	async execute(input: CadastrarClienteInput): Promise<CadastrarClienteOutput> {
		this.logger.info({ input }, "Novo cadsatro de cliente");
		const clienteAlreadyExists = await this.clienteRepository.findByCpf(input.cpf);
		if (clienteAlreadyExists) throw new AlreadyExistsError("Cliente já cadastrado");
		const cliente = Cliente.new({ ...input });
		await this.clienteRepository.save(cliente);
		this.logger.info({ cliente }, "Cliente cadastrado com sucesso");
		return cliente;
	}
}
