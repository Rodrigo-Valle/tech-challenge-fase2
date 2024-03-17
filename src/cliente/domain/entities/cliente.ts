import { ValidationError } from "@/shared/domain/exception";
import { Id } from "@/shared/domain/value-objects";
import { CPF, Email } from "../value-objects";

export class Cliente {
	private id: Id;
	private nome: string;
	private email: Email;
	private cpf: CPF;

	private constructor(params: ClienteConstructorParams) {
		this.id = params.id;
		this.nome = params.nome;
		this.email = params.email;
		this.cpf = params.cpf;
	}

	static new(params: NewCliente): Cliente {
		const sanitizedValue = params.nome.trim();
		const nomeIsValid = Cliente.validateNome(sanitizedValue);
		if (!nomeIsValid) throw new ValidationError(`Nome informado é inválido, nome: ${params.nome}`);
		return new Cliente({
			id: Id.new(),
			nome: sanitizedValue,
			email: Email.new(params.email),
			cpf: CPF.new(params.cpf)
		});
	}

	static restore(params: RestoreCliente): Cliente {
		return new Cliente({
			id: Id.restore(params.id),
			nome: params.nome,
			email: Email.new(params.email),
			cpf: CPF.new(params.cpf)
		});
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

	toJson() {
		return {
			id: this.id.getValue(),
			nome: this.nome,
			email: this.email.getValue(),
			cpf: this.cpf.getValue()
		};
	}
}

interface ClienteConstructorParams {
	id: Id;
	nome: string;
	email: Email;
	cpf: CPF;
}

interface NewCliente {
	nome: string;
	email: string;
	cpf: string;
}

interface RestoreCliente {
	id: string;
	nome: string;
	email: string;
	cpf: string;
}
