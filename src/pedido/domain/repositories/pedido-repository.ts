import { Pedido } from "../entities/pedido";

export interface PedidoRepository {
	save(pedido: Pedido): Promise<void>;
	update(pedido: Pedido): Promise<void>;
}
