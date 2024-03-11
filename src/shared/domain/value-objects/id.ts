import crypto from "crypto";

export class Id {
	private readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static new() {
		const uuid = crypto.randomUUID();
		return new Id(uuid);
	}

	static restore(uuid: string) {
		return new Id(uuid);
	}

	getValue(): string {
		return this.value;
	}
}
