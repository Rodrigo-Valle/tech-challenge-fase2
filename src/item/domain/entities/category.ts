import { Id, Name } from "@/shared/domain/value-objects";

export class Category {
	private id: Id;
	private name: Name;

	private constructor(params: CategoryConstructorParams) {
		this.id = params.id;
		this.name = params.name;
	}

	static new(params: NewCategory): Category {
		return new Category({
			id: Id.new(),
			name: Name.new(params.name)
		});
	}

	static restore(params: RestoreCategory): Category {
		return new Category({
			id: Id.restore(params.id),
			name: Name.new(params.name)
		});
	}

	getId(): string {
		return this.id.getValue();
	}

	getname(): string {
		return this.name.getValue();
	}

	toJson() {
		return {
			id: this.id.getValue(),
			name: this.name.getValue()
		};
	}
}

interface CategoryConstructorParams {
	id: Id;
	name: Name;
}

interface NewCategory {
	name: string;
}

interface RestoreCategory {
	id: string;
	name: string;
}
