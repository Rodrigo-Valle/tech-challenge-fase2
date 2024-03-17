import { Pedido } from "@/pedido/domain/entities/pedido";

export interface PagamentoGateway {
	gerarQrCode(pedido: Pedido): Promise<string>;
}
