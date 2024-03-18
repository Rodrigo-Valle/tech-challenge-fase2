import { Item } from "@/item/domain/entities";
import { Id, Price } from "@/shared/domain/value-objects";
import currency from "currency.js";

export class OrderItem {
	private id: Id;
	private item: Item;
	private quantity: number;
	private unitValue: Price;
	private totalValue: Price;

	private constructor(params: OrderItemConstructorParams) {
		this.id = params.id;
		this.item = params.item;
		this.quantity = params.quantity;
		this.unitValue = params.unitValue;
		this.totalValue = params.totalValue;
	}

	static calculateTotalValue(price: string, quantity: number): string {
		return currency(price).multiply(quantity).format({ symbol: "" });
	}

	static new(params: NewOrderItem): OrderItem {
		return new OrderItem({
			...params,
			id: Id.new(),
			unitValue: Price.new(params.item.getPrice()),
			totalValue: Price.new(OrderItem.calculateTotalValue(params.item.getPrice(), params.quantity))
		});
	}

	static restore(params: OrderItemRestoreParams): OrderItem {
		const id = Id.restore(params.id);
		const unitValue = Price.new(params.unitValue);
		const totalValue = Price.new(params.totalValue);
		return new OrderItem({ ...params, id, unitValue, totalValue });
	}

	getTotalValue(): string {
		return this.totalValue.getValue();
	}

	toJson() {
		return {
			id: this.id.getValue(),
			item: this.item.toJson(),
			quantity: this.quantity,
			unitValue: this.unitValue.getValue(),
			totalValue: this.totalValue.getValue()
		};
	}
}

type OrderItemConstructorParams = {
	id: Id;
	item: Item;
	quantity: number;
	unitValue: Price;
	totalValue: Price;
};

type OrderItemRestoreParams = {
	id: string;
	item: Item;
	quantity: number;
	unitValue: string;
	totalValue: string;
};

type NewOrderItem = {
	item: Item;
	quantity: number;
};
