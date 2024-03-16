export class StatusPagamento {
	private readonly value: StatusPagamentoEnum;

	private constructor(value: StatusPagamentoEnum) {
		this.value = value;
	}

	static new(status: keyof typeof StatusPagamentoEnum): StatusPagamento {
		return new StatusPagamento(StatusPagamentoEnum[status]);
	}

	getValue(): string {
		return this.value;
	}

	toJson() {
		return this.value;
	}
}

enum StatusPagamentoEnum {
	PENDENTE = "Pendente",
	APROVADO = "Aprovado",
	REJEITADO = "Rejeitado"
}
