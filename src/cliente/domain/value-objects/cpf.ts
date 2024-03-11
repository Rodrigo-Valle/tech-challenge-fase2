import { ValidationError } from "@/shared/exception";

export class CPF {
	private readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static new(value: string) {
		const sanitizedValue = value.trim();
		const isValid = CPF.validateCpf(sanitizedValue);
		if (!isValid) throw new ValidationError(`CPF informado é inválido, CPF: ${value}`);
		return new CPF(sanitizedValue);
	}

	getValue() {
		return this.value;
	}

	static validateCpf(cpf: string): boolean {
		const regex = /^\d{11}$/;
		return regex.test(cpf);
	}
}
