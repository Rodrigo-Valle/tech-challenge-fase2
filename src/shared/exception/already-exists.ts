import { BaseError } from "./base-error";

export class AlreadyExistsError extends BaseError {
	constructor(message: string) {
		super(message, null);
		this.name = "AlreadyExistsError";
	}
}
