import { Cliente } from "@/cliente/domain/entities/cliente";
import { ClienteRepository } from "@/cliente/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { NotFoundError } from "@/shared/domain/exception";

type BuscarClienteInput = {
	cpf: string;
};

type BuscarClienteOutput = Cliente;

export class BuscarClientePorCPFUsecase
	extends BaseUsecase
	implements Usecase<BuscarClienteInput, BuscarClienteOutput>
{
	constructor(
		logger: Log,
		private readonly clienteRepository: ClienteRepository
	) {
		super(logger);
	}

	async execute({ cpf }: BuscarClienteInput): Promise<BuscarClienteOutput> {
		this.logger.info(`Buscando cliente pelo CPF: : ${cpf}`);
		const cliente = await this.clienteRepository.findByCpf(cpf);
		if (!cliente) throw new NotFoundError(`Cliente não encontrado para o CPF: ${cpf}`);
		this.logger.info(cliente, "Cliente encontrado, retornando cliente");
		return cliente;
	}
}
