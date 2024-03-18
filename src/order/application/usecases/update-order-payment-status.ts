import { Order } from "@/order/domain/entities/order";
import { OrderRepository } from "@/order/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { NotFoundError } from "@/shared/domain/exception";

type UpdateOrderPaymentStatusInput = {
	orderId: string;
	statusPagamento: string;
};

type UpdateOrderPaymentStatusOutput = Order;

export class UpdateOrderPaymentStatusUsecase
	extends BaseUsecase
	implements Usecase<UpdateOrderPaymentStatusInput, UpdateOrderPaymentStatusOutput>
{
	constructor(
		logger: Log,
		private readonly orderRepository: OrderRepository
	) {
		super(logger);
	}

	async execute(input: UpdateOrderPaymentStatusInput): Promise<UpdateOrderPaymentStatusOutput> {
		this.logger.info({ input }, "Nova requisição para atualização do status de pagamento de pedido");
		const order = await this.orderRepository.findById(input.orderId);
		if (!order) throw new NotFoundError("Pedido não encontrado");
		order.setPaymentStatus(input.statusPagamento);
		await this.orderRepository.update(order);
		this.logger.info({ order }, "Status de pagamento do pedido alterado com sucesso");
		return order;
	}
}
