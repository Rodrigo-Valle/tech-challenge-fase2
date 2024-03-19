import { Order } from "@/order/domain/entities/order";
import { OrderRepository } from "@/order/domain/repositories";
import { OrderStatusEnum } from "@/order/domain/value-objects";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";

type GetOrderOrderedByStatusOutput = Order[];

export class GetOrderOrderedByStatusUsecase
	extends BaseUsecase
	implements Usecase<never, GetOrderOrderedByStatusOutput>
{
	constructor(
		logger: Log,
		private readonly orderRepository: OrderRepository
	) {
		super(logger);
	}

	async execute(): Promise<GetOrderOrderedByStatusOutput> {
		this.logger.info("Buscando pedidos ordenados por status");
		const orders = await this.orderRepository.findOrderedByStatus();
		const readyOrders = new Set<Order>();
		const inPreparationOrders = new Set<Order>();
		const receivedOrders = new Set<Order>();
		for (const order of orders) {
			if (order.getOrderStatus().getValue() === OrderStatusEnum.READY) {
				readyOrders.add(order);
			} else if (order.getOrderStatus().getValue() === OrderStatusEnum.IN_PREPARATION) {
				inPreparationOrders.add(order);
			} else {
				receivedOrders.add(order);
			}
		}
		const sortedOrders = [
			...Array.from(readyOrders).sort((a, b) => a.getCreationDate().getTime() - b.getCreationDate().getTime()),
			...Array.from(inPreparationOrders).sort((a, b) => a.getCreationDate().getTime() - b.getCreationDate().getTime()),
			...Array.from(receivedOrders).sort((a, b) => a.getCreationDate().getTime() - b.getCreationDate().getTime())
		];
		this.logger.info("retornando pedidos encontrados");
		return sortedOrders;
	}
}
