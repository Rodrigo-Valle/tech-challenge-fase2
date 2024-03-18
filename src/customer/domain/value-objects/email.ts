import { ValidationError } from "@/shared/domain/exception";

export class Email {
	private readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static new(value: string) {
		const sanitizedValue = value.trim().toLowerCase();
		const isValid = Email.validateEmail(sanitizedValue);
		if (!isValid) throw new ValidationError(`Email informado é inválido, email: ${value}`);
		return new Email(sanitizedValue);
	}

	getValue() {
		return this.value;
	}

	static validateEmail(email: string): boolean {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
}
