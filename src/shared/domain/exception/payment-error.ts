import { BaseError } from "./base-error";

export class PaymentError extends BaseError {
	constructor(message: string) {
		super(message);
		this.name = "PaymentError";
	}
}
