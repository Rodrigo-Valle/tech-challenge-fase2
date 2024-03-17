import { Pedido } from "@/pedido/domain/entities/pedido";
import { PedidoRepository } from "@/pedido/domain/repositories";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaPedidoRepository extends PrismaBaseRepository implements PedidoRepository {
	async save(pedido: Pedido): Promise<void> {
		const pedidoData = pedido.toJson();
		await this.client.pedido.create({
			data: {
				...pedidoData,
				items: {
					createMany: {
						data: pedidoData.items.map((itemPedido) => ({
							quantidade: itemPedido.quantidade,
							id: itemPedido.id,
							valorTotal: itemPedido.valorTotal,
							itemId: itemPedido.item.id
						}))
					}
				}
			}
		});
	}

	async update(pedido: Pedido): Promise<void> {
		const pedidoData = pedido.toJson();
		await this.client.pedido.update({
			where: { id: pedido.getId() },
			data: {
				...pedidoData,
				items: undefined
			}
		});
	}
}
