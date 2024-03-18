import { Order } from "../entities/order";

export interface OrderRepository {
	save(pedido: Order): Promise<void>;
	update(pedido: Order): Promise<void>;
	findById(id: string): Promise<Order | null>;
}
