import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
	constructor(message: string, details: unknown) {
		super(message, details);
		this.name = "BadRequestError";
	}
}
