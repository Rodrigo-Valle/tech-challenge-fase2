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
		if (!(status in PaymentStatusEnum)) {
			throw new ValidationError(`Status de pagamento inválido: ${status}`);
		}
	}

	getValue(): string {
		return this.value;
	}

	toJson() {
		return this.value;
	}
}

export enum PaymentStatusEnum {
	PENDENTE = "Pendente",
	APROVADO = "Aprovado",
	REJEITADO = "Rejeitado",
	CANCELADO = "Cancelado"
}
