import { ValidationError } from "@/shared/domain/exception";

export class OrderStatus {
	private readonly value: OrderStatusEnum;

	private constructor(value: OrderStatusEnum) {
		this.value = value;
	}

	static new(status: string): OrderStatus {
		OrderStatus.validateStatus(status);
		return new OrderStatus(status as OrderStatusEnum);
	}

	static validateStatus(status: string): void {
		if (!(status in OrderStatusEnum)) {
			throw new ValidationError(`Status do pedido inválido: ${status}`);
		}
	}

	getValue(): string {
		return this.value;
	}

	toJson() {
		return this.value;
	}
}

export enum OrderStatusEnum {
	RECEIVED = "Recebido",
	IN_PREPARATION = "Em preparo",
	READY = "Pronto",
	COMPLETED = "Finalizado",
	CANCELLED = "Cancelado"
}
