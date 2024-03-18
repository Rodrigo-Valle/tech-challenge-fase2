import { ValidationError } from "@/shared/domain/exception";
import currency from "currency.js";

export class Price {
	private readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static new(value: string | number) {
		const validPrice = Price.validatePrice(value);
		return new Price(validPrice);
	}

	getValue() {
		return this.value;
	}

	static validatePrice(preco: string | number): string {
		const currencyPrice = currency(preco);
		if (currencyPrice.value < 0) throw new ValidationError(`Preço informado é inválido, preço: ${preco}`);
		return currencyPrice.format({ symbol: "" });
	}
}
