import { Order } from "@/order/domain/entities/order";
import { OrderRepository } from "@/order/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { NotFoundError } from "@/shared/domain/exception";

type ChangeOrderPaymentStatusInput = {
	orderId: string;
	statusPagamento: string;
};

type ChangeOrderPaymentStatusOutput = Order;

export class ChangeOrderPaymentStatusUsecase
	extends BaseUsecase
	implements Usecase<ChangeOrderPaymentStatusInput, ChangeOrderPaymentStatusOutput>
{
	constructor(
		logger: Log,
		private readonly orderRepository: OrderRepository
	) {
		super(logger);
	}

	async execute(input: ChangeOrderPaymentStatusInput): Promise<ChangeOrderPaymentStatusOutput> {
		this.logger.info({ input }, "Nova requisição para alterar status de pagamento de pedido");
		const order = await this.orderRepository.findById(input.orderId);
		if (!order) throw new NotFoundError("Pedido não encontrado");
		order.setPaymentStatus(input.statusPagamento);
		await this.orderRepository.update(order);
		this.logger.info({ order }, "Status de pagamento do order alterado com sucesso");
		return order;
	}
}
