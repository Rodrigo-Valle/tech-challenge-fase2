import { ItemRepository } from "@/item/domain/repositories";
import { Order } from "@/order/domain/entities/order";
import { OrderRepository } from "@/order/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { NotFoundError } from "@/shared/domain/exception";

type CreateOrderInput = {
	customerId: string | null;
	items: {
		id: string;
		quantity: number;
	}[];
};

type CreateOrderOutput = Order;

export class CreateOrderUsecase extends BaseUsecase implements Usecase<CreateOrderInput, CreateOrderOutput> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository,
		private readonly orderRepository: OrderRepository
	) {
		super(logger);
	}

	async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
		this.logger.info({ input }, "Novo order recebido");
		const order = Order.new({ customerId: input.customerId });
		for (const item of input.items) {
			const itemFound = await this.itemRepository.findById(item.id);
			if (!itemFound) throw new NotFoundError(`Item com id ${item.id} não encontrado`);
			order.addItem(itemFound, item.quantity);
		}
		order.calculateTotalValue();
		await this.orderRepository.save(order);
		this.logger.info({ order }, "Pedido cadastrado com sucesso");
		return order;
	}
}
