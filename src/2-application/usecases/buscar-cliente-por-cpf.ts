import { Cliente } from "@/1-domain/entities/cliente";
import { NotFoundError } from "@/1-domain/exception";
import { ClienteRepository } from "@/1-domain/repositories";
import { Log, Usecase } from "@/2-application/contracts";
import { BaseUsecase } from "./base-usecase";

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
