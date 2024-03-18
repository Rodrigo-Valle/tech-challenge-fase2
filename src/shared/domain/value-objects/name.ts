import { ValidationError } from "@/shared/domain/exception";

export class Name {
	private readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static new(value: string) {
		const validName = Name.validateName(value);
		return new Name(validName);
	}

	getValue() {
		return this.value;
	}

	static validateName(name: string): string {
		const sanitizedValue = name.trim();
		const nameHasInvalidLenght = sanitizedValue.length < 3 || sanitizedValue.length > 255;
		if (nameHasInvalidLenght) throw new ValidationError(`Nome informado é inválido, nome: ${name}`);
		return sanitizedValue;
	}
}
