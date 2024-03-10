import { BaseError } from "./base-error";

export class ValidationError extends BaseError {
	constructor(errors: string | string[]) {
		super("Erro na validação dos dados", errors);
		this.name = "ValidationError";
	}

	getErrors(): string | string[] {
		return this.detail as string | string[];
	}
}
