export class Email {
	private readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static new(value: string) {
		const isValid = Email.validateEmail(value);
		if (!isValid) throw new Error(`Email informado é inválido: ${value}`);
		return new Email(value);
	}

	getValue() {
		return this.value;
	}

	static validateEmail(email: string): boolean {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
}
