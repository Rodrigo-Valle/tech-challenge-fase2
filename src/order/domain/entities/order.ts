import { Item } from "@/item/domain/entities";
import { Id, Price } from "@/shared/domain/value-objects";
import currency from "currency.js";
import { OrderStatus, OrderStatusEnum, PaymentStatus, PaymentStatusEnum } from "../value-objects";
import { OrderItem } from "./order-item";

export class Order {
	private id: Id;
	private items: OrderItem[];
	private creationDate: Date;
	private paymentStatus: PaymentStatus;
	private orderStatus: OrderStatus;
	private totalValue: Price;
	private customerId: Id | null;

	private constructor(params: OrderConstructorParams) {
		this.id = params.id;
		this.items = params.items;
		this.creationDate = params.creationDate;
		this.paymentStatus = params.paymentStatus;
		this.orderStatus = params.orderStatus;
		this.totalValue = params.totalValue;
		this.customerId = params.customerId;
	}

	static new(params: NewOrderParams): Order {
		return new Order({
			id: Id.new(),
			items: [],
			totalValue: Price.new(0),
			paymentStatus: PaymentStatus.new(PaymentStatusEnum.PENDING),
			orderStatus: OrderStatus.new(OrderStatusEnum.RECEIVED),
			creationDate: new Date(),
			customerId: params.customerId ? Id.restore(params.customerId) : null
		});
	}

	static restore(params: RestoreOrderParams): Order {
		const id = Id.restore(params.id);
		const orderStatus = OrderStatus.new(params.orderStatus);
		const paymentStatus = PaymentStatus.new(params.paymentStatus);
		const totalValue = Price.new(params.totalValue);
		const customerId = params.customerId ? Id.restore(params.customerId) : null;
		return new Order({ ...params, id, orderStatus, paymentStatus, totalValue, customerId });
	}

	addItem(item: Item, quantity: number) {
		const orderItem = OrderItem.new({ item, quantity });
		this.items.push(orderItem);
	}

	getId(): string {
		return this.id.getValue();
	}

	calculateTotalValue() {
		const totalValue = this.items.reduce((acc, item) => {
			const itemTotalValue = item.getTotalValue();
			return acc.add(itemTotalValue);
		}, currency("0"));
		this.totalValue = Price.new(totalValue.format({ symbol: "" }));
	}

	setPaymentStatus(paymentStatus: string) {
		this.paymentStatus = PaymentStatus.new(paymentStatus);
		this.setOrderStatusByPaymentStatus();
	}

	setOrderStatusByPaymentStatus() {
		if (this.paymentStatus.isApproved()) {
			this.orderStatus = OrderStatus.new(OrderStatusEnum.IN_PREPARATION);
		}
		if (this.paymentStatus.isCancelled()) {
			this.orderStatus = OrderStatus.new(OrderStatusEnum.CANCELLED);
		}
	}

	getOrderStatus(): OrderStatus {
		return this.orderStatus;
	}

	getCreationDate(): Date {
		return this.creationDate;
	}

	toJson() {
		return {
			id: this.id.getValue(),
			items: this.items.map((item) => item.toJson()),
			creationDate: this.creationDate,
			paymentStatus: this.paymentStatus.toJson(),
			orderStatus: this.orderStatus.toJson(),
			totalValue: this.totalValue.getValue(),
			customerId: this.customerId?.getValue() ?? null
		};
	}
}

type OrderConstructorParams = {
	id: Id;
	items: OrderItem[];
	creationDate: Date;
	paymentStatus: PaymentStatus;
	orderStatus: OrderStatus;
	totalValue: Price;
	customerId: Id | null;
};

type RestoreOrderParams = {
	id: string;
	items: OrderItem[];
	creationDate: Date;
	paymentStatus: string;
	orderStatus: string;
	totalValue: string;
	customerId: string | null;
};

type NewOrderParams = {
	customerId: string | null;
};
