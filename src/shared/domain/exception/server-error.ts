import { BaseError } from "./base-error";

export class ServerError extends BaseError {
	constructor(message: string, detail: unknown) {
		super(message, detail);
		this.name = "ServerException";
	}
}
