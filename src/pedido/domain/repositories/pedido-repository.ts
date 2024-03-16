import { Pedido } from "../entities/pedido";

export interface PedidoRepository {
	save(pedido: Pedido): Promise<void>;
}
