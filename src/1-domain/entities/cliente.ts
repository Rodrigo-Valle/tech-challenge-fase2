import { Id, Email, CPF } from "../value-objects";

export class Cliente {
	id: Id;
	nome: string;
	email: Email;
	cpf: CPF;

	private constructor(nome: string, email: string, cpf: string) {
		this.id = Id.new();
		this.nome = nome;
		this.email = Email.new(email);
		this.cpf = CPF.new(cpf);
	}

	static new(nome: string, email: string, cpf: string): Cliente {
		const nomeIsValid = Cliente.validateNome(nome);
		if (!nomeIsValid) throw new Error(`Nome informado é inválido: ${nome}`);
		return new Cliente(nome, email, cpf);
	}

	static validateNome(nome: string): boolean {
		return nome.length >= 3 && nome.length <= 255;
	}
}
