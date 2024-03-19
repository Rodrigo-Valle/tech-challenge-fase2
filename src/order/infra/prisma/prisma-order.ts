import { Category, Item } from "@/item/domain/entities";
import { OrderItem } from "@/order/domain/entities";
import { Order } from "@/order/domain/entities/order";
import { OrderRepository } from "@/order/domain/repositories";
import { OrderStatusEnum } from "@/order/domain/value-objects";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaOrderRepository extends PrismaBaseRepository implements OrderRepository {
	async save(order: Order): Promise<void> {
		const orderData = order.toJson();
		await this.client.order.create({
			data: {
				...orderData,
				items: {
					createMany: {
						data: orderData.items.map((orderItem) => ({
							quantity: orderItem.quantity,
							id: orderItem.id,
							unitValue: orderItem.unitValue,
							totalValue: orderItem.totalValue,
							itemId: orderItem.item.id
						}))
					}
				}
			}
		});
	}

	async update(order: Order): Promise<void> {
		const orderData = order.toJson();
		await this.client.order.update({
			where: { id: order.getId() },
			data: {
				...orderData,
				items: undefined
			}
		});
	}

	async findById(id: string): Promise<Order | null> {
		const orderData = await this.client.order.findUnique({
			where: { id },
			include: {
				items: {
					include: { item: { include: { category: true } } }
				}
			}
		});
		if (!orderData) return null;
		const itemsData = orderData.items.map((orderItem) => {
			const category = Category.restore(orderItem.item.category);
			const item = Item.restore({ ...orderItem.item, category });
			return OrderItem.restore({ ...orderItem, item });
		});
		return Order.restore({ ...orderData, items: itemsData });
	}

	async findOrderedByStatus(): Promise<Order[]> {
		const orders = await this.client.order.findMany({
			where: {
				orderStatus: {
					in: [OrderStatusEnum.READY, OrderStatusEnum.IN_PREPARATION, OrderStatusEnum.RECEIVED]
				}
			},
			include: {
				items: {
					include: { item: { include: { category: true } } }
				}
			}
		});
		return orders.map((orderData) => {
			const itemsData = orderData.items.map((orderItem) => {
				const category = Category.restore(orderItem.item.category);
				const item = Item.restore({ ...orderItem.item, category });
				return OrderItem.restore({ ...orderItem, item });
			});
			return Order.restore({ ...orderData, items: itemsData });
		});
	}
}
