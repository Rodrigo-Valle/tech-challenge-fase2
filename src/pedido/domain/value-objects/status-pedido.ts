export class StatusPedido {
	private readonly value: StatusPedidoEnum;

	private constructor(value: StatusPedidoEnum) {
		this.value = value;
	}

	static new(status: keyof typeof StatusPedidoEnum): StatusPedido {
		return new StatusPedido(StatusPedidoEnum[status]);
	}

	getValue(): string {
		return this.value;
	}

	toJson() {
		return this.value;
	}
}

enum StatusPedidoEnum {
	RECEBIDO = "Recebido",
	EM_PREPARO = "Em preparo",
	PRONTO = "Pronto",
	FINALIZADO = "Finalizado"
}
