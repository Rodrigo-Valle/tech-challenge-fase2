export class ValidationError extends Error {
	private readonly errors: string[];
	constructor(errors: string[]) {
		super("Erro na validação dos dados");
		this.errors = errors;
		this.name = "ValidationError";
	}

	getErrors(): string[] {
		return this.errors;
	}
}
