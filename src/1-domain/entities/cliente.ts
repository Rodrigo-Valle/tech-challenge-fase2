import { Id, Email, CPF } from "../value-objects";

export class Cliente {
	private id: Id;
	private nome: string;
	private email: Email;
	private cpf: CPF;

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
		const regex = /\d/;
		const nameHasNumbers = regex.test(nome);
		const nameHasInvalidLenght = nome.length < 3 || nome.length > 255;
		if (nameHasInvalidLenght || nameHasNumbers) return false;
		return true;
	}

	getId(): string {
		return this.id.getValue();
	}

	getNome(): string {
		return this.nome;
	}

	getEmail(): string {
		return this.email.getValue();
	}

	getCpf(): string {
		return this.cpf.getValue();
	}
}
