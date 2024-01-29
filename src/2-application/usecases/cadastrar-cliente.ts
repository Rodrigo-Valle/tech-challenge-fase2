import { Cliente } from "@/1-domain/entities/cliente";
import { ClienteRepository } from "@/1-domain/repositories";
import { Usecase } from "../contracts";

type CadastrarClienteInput = {
	nome: string;
	email: string;
	cpf: string;
};

type CadastrarClienteOutput = Cliente;

export class CadastrarClienteUsecase implements Usecase<CadastrarClienteInput, CadastrarClienteOutput> {
	constructor(private readonly clienteRepository: ClienteRepository) {}

	async execute(input: CadastrarClienteInput): Promise<CadastrarClienteOutput> {
		const clienteAlreadyExists = await this.clienteRepository.findByCpf(input.cpf);
		if (clienteAlreadyExists) throw new Error("Cliente já cadastrado");
		const cliente = Cliente.new({ ...input });
		await this.clienteRepository.save(cliente);
		return cliente;
	}
}
