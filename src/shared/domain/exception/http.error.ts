import { BaseError } from "./base-error";

export class HttpClientError extends BaseError {
	status: number;

	constructor(message: string, detail: unknown, status = 500) {
		super(message, detail);
		this.status = status;
		this.name = "HttpClientError";
	}
}
