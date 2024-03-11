import { Id } from "@/shared/domain/value-objects";
import { ValidationError } from "@/shared/exception";

export class Categoria {
	private id: Id;
	private nome: string;

	private constructor(params: CategoriaConstructorParams) {
		this.id = params.id;
		this.nome = params.nome;
	}

	static new(params: NewCategoria): Categoria {
		const nomeValido = Categoria.validateNome(params.nome);
		return new Categoria({
			id: Id.new(),
			nome: nomeValido
		});
	}

	static restore(params: RestoreCategoria): Categoria {
		return new Categoria({
			id: Id.restore(params.id),
			nome: params.nome
		});
	}

	static validateNome(nome: string): string {
		const sanitizedValue = nome.trim();
		const nameHasInvalidLenght = sanitizedValue.length < 3 || sanitizedValue.length > 255;
		if (!nameHasInvalidLenght) throw new ValidationError(`Nome informado é inválido, nome: ${nome}`);
		return sanitizedValue;
	}

	getId(): string {
		return this.id.getValue();
	}

	getNome(): string {
		return this.nome;
	}

	toJson() {
		return {
			id: this.id.getValue(),
			nome: this.nome
		};
	}
}

interface CategoriaConstructorParams {
	id: Id;
	nome: string;
}

interface NewCategoria {
	nome: string;
}

interface RestoreCategoria {
	id: string;
	nome: string;
}
