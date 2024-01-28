import { Cliente } from "@/1-domain/entities/cliente";
import { ClienteRepository } from "@/1-domain/repositories";

type CadastrarClienteInput = {
	nome: string;
	email: string;
	cpf: string;
};

type CadastrarClienteOutput = Cliente;

export class CadastrarClienteUsecase {
	constructor(private readonly clienteRepository: ClienteRepository) {}
	execute(input: CadastrarClienteInput): CadastrarClienteOutput {
		const cliente = Cliente.new(input.nome, input.email, input.cpf);
		this.clienteRepository.save(cliente);
		return cliente;
	}
}
