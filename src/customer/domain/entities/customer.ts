import { Id, Name } from "@/shared/domain/value-objects";
import { CPF, Email } from "../value-objects";

export class Customer {
	private id: Id;
	private name: Name;
	private email: Email;
	private cpf: CPF;

	private constructor(params: CustomerConstructorParams) {
		this.id = params.id;
		this.name = params.name;
		this.email = params.email;
		this.cpf = params.cpf;
	}

	static new(params: NewCustomer): Customer {
		return new Customer({
			id: Id.new(),
			name: Name.new(params.name),
			email: Email.new(params.email),
			cpf: CPF.new(params.cpf)
		});
	}

	static restore(params: RestoreCustomer): Customer {
		return new Customer({
			id: Id.restore(params.id),
			name: Name.new(params.name),
			email: Email.new(params.email),
			cpf: CPF.new(params.cpf)
		});
	}

	getId(): string {
		return this.id.getValue();
	}

	getName(): string {
		return this.name.getValue();
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
			name: this.name.getValue(),
			email: this.email.getValue(),
			cpf: this.cpf.getValue()
		};
	}
}

interface CustomerConstructorParams {
	id: Id;
	name: Name;
	email: Email;
	cpf: CPF;
}

interface NewCustomer {
	name: string;
	email: string;
	cpf: string;
}

interface RestoreCustomer {
	id: string;
	name: string;
	email: string;
	cpf: string;
}
