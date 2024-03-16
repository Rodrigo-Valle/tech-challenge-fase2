import { Id, Preco } from "@/shared/domain/value-objects";
import { ValidationError } from "@/shared/exception";
import { Categoria } from "./categoria";

export class Item {
	private id: Id;
	private nome: string;
	private preco: Preco;
	private categoria: Categoria;

	private constructor(params: ItemConstructorParams) {
		this.id = params.id;
		this.nome = params.nome;
		this.preco = params.preco;
		this.categoria = params.categoria;
	}

	static new(params: NewItem): Item {
		const nomeValido = Item.validateNome(params.nome);
		return new Item({
			id: Id.new(),
			nome: nomeValido,
			preco: Preco.new(params.preco),
			categoria: params.categoria
		});
	}

	static restore(params: RestoreItem): Item {
		return new Item({
			id: Id.restore(params.id),
			nome: params.nome,
			preco: Preco.new(params.preco),
			categoria: params.categoria
		});
	}

	static validateNome(nome: string): string {
		const sanitizedValue = nome.trim();
		const nameHasInvalidLenght = sanitizedValue.length < 3 || sanitizedValue.length > 255;
		if (nameHasInvalidLenght) throw new ValidationError(`Nome informado é inválido, nome: ${nome}`);
		return sanitizedValue;
	}

	update(params: UpdateParams): void {
		if (params.nome) this.nome = Item.validateNome(params.nome);
		if (params.preco) this.preco = Preco.new(params.preco);
	}

	getId(): string {
		return this.id.getValue();
	}

	getPreco(): string {
		return this.preco.getValue();
	}

	toJson() {
		return {
			id: this.id.getValue(),
			nome: this.nome,
			preco: this.preco.getValue(),
			categoria: this.categoria.toJson()
		};
	}

	toPersistence() {
		return {
			id: this.id.getValue(),
			nome: this.nome,
			preco: this.preco.getValue(),
			idCategoria: this.categoria.getId()
		};
	}
}

type ItemConstructorParams = {
	id: Id;
	nome: string;
	preco: Preco;
	categoria: Categoria;
};

type NewItem = {
	nome: string;
	preco: number | string;
	categoria: Categoria;
};

type RestoreItem = {
	id: string;
	nome: string;
	preco: string;
	categoria: Categoria;
};

type UpdateParams = { nome?: string; preco?: number };
