import { ValidationError } from "@/shared/domain/exception";

export class PaymentStatus {
	private readonly value: PaymentStatusEnum;

	private constructor(value: PaymentStatusEnum) {
		this.value = value;
	}

	static new(status: string): PaymentStatus {
		PaymentStatus.validateStatus(status);
		return new PaymentStatus(status as PaymentStatusEnum);
	}

	static validateStatus(status: string): void {
		if (!Object.values(PaymentStatusEnum).includes(status as PaymentStatusEnum)) {
			throw new ValidationError(`Status de pagamento inválido: ${status}`);
		}
	}

	isApproved(): boolean {
		return this.value === PaymentStatusEnum.APPROVED;
	}

	isCancelled(): boolean {
		return this.value === PaymentStatusEnum.CANCELLED;
	}

	getValue(): string {
		return this.value;
	}

	toJson() {
		return this.value;
	}
}

export enum PaymentStatusEnum {
	PENDING = "Pendente",
	APPROVED = "Aprovado",
	REJECTED = "Rejeitado",
	CANCELLED = "Cancelado"
}
