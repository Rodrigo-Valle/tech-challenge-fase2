export abstract class BaseError extends Error {
	detail: unknown;

	constructor(message: string, detail: unknown = null) {
		super(message);
		this.detail = detail;
		this.name = this.constructor.name;
	}
}
