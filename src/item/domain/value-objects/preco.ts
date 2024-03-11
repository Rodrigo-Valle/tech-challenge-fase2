import { ValidationError } from "@/shared/exception";
import currency from "currency.js";

export class Preco {
	private readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static new(value: string | number) {
		const validPreco = Preco.validatePreco(value);
		return new Preco(validPreco);
	}

	getValue() {
		return this.value;
	}

	static validatePreco(preco: string | number): string {
		const currencyPreco = currency(preco);
		if (currencyPreco.value <= 0) throw new ValidationError(`Preço informado é inválido, preço: ${preco}`);
		return currencyPreco.format({ symbol: "" });
	}
}
