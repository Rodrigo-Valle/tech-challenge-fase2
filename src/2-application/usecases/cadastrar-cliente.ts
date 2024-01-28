import { Cliente } from "@/1-domain/entities/cliente";

type CadastrarClienteInput = {
	nome: string;
	email: string;
	cpf: string;
};

type CadastrarClienteOutput = Cliente;

export class CadastrarClienteUsecase {
	execute(input: CadastrarClienteInput): CadastrarClienteOutput {
		const cliente = Cliente.new(input.nome, input.email, input.cpf);
		return cliente;
	}
}
