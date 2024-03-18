import { Id, Name, Price } from "@/shared/domain/value-objects";
import { Category } from "./category";

export class Item {
	private id: Id;
	private name: Name;
	private price: Price;
	private category: Category;

	private constructor(params: ItemConstructorParams) {
		this.id = params.id;
		this.name = params.name;
		this.price = params.price;
		this.category = params.category;
	}

	static new(params: NewItem): Item {
		return new Item({
			id: Id.new(),
			name: Name.new(params.name),
			price: Price.new(params.price),
			category: params.category
		});
	}

	static restore(params: RestoreItem): Item {
		return new Item({
			id: Id.restore(params.id),
			name: Name.new(params.name),
			price: Price.new(params.price),
			category: params.category
		});
	}

	update(params: UpdateParams): void {
		if (params.name) this.name = Name.new(params.name);
		if (params.price) this.price = Price.new(params.price);
	}

	getId(): string {
		return this.id.getValue();
	}

	getPrice(): string {
		return this.price.getValue();
	}

	toJson() {
		return {
			id: this.id.getValue(),
			name: this.name.getValue(),
			price: this.price.getValue(),
			category: this.category.toJson()
		};
	}

	toPersistence() {
		return {
			id: this.id.getValue(),
			name: this.name.getValue(),
			price: this.price.getValue(),
			categoryId: this.category.getId()
		};
	}
}

type ItemConstructorParams = {
	id: Id;
	name: Name;
	price: Price;
	category: Category;
};

type NewItem = {
	name: string;
	price: number | string;
	category: Category;
};

type RestoreItem = {
	id: string;
	name: string;
	price: string;
	category: Category;
};

type UpdateParams = { name?: string; price?: number };
