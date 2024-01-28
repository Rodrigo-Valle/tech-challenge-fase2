export class CPF {
	private readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static new(value: string) {
		const isValid = CPF.validateCpf(value);
		if (!isValid) throw new Error(`CPF informado é inválido: ${value}`);
		return new CPF(value);
	}

	getValue() {
		return this.value;
	}

	static validateCpf(cpf: string): boolean {
		const regex = /^\d{11}$/;
		return regex.test(cpf);
	}
}
