import { PagamentoGateway } from "@/pedido/application/contracts";
import { Pedido } from "@/pedido/domain/entities/pedido";
import { HttpClient } from "@/shared/application/contracts";

export class MercadoPagoPagamentoGateway implements PagamentoGateway {
	private readonly baseUrl =
		`https://api.mercadopago.com/instore/orders/qr/seller/collectors/${process.env.ID_LOJA}/pos/${process.env.ID_POS}/qrs`;

	constructor(private readonly httpClient: HttpClient) {}

	async gerarQrCode(pedido: Pedido): Promise<string> {
		const result = await this.httpClient.post<MercadoPagoOrderInput, MercadoPagoOrderOutput>({
			url: this.baseUrl,
			body: this.mapPedidoToMercadoPagoInput(pedido),
			params: {
				headers: {
					Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
				}
			}
		});
		return result.data.qr_data;
	}

	private mapPedidoToMercadoPagoInput(pedido: Pedido): MercadoPagoOrderInput {
		const pedidoData = pedido.toJson();
		return {
			external_reference: pedidoData.id,
			total_amount: Number(pedidoData.valorTotal),
			description: `Pedido: ${pedidoData.id} | Loja: ${process.env.ID_LOJA} | Pos: ${process.env.ID_POS}`,
			title: `Venda: ${pedidoData.id}`,
			items: pedidoData.items.map((itemPedido) => {
				return {
					sku_number: itemPedido.id,
					category: itemPedido.item.categoria.nome,
					title: itemPedido.item.nome,
					description: "",
					quantity: itemPedido.quantidade,
					unit_measure: "unit",
					unit_price: Number(itemPedido.item.preco),
					total_amount: Number(itemPedido.valorTotal)
				};
			})
		};
	}
}

type MercadoPagoOrderInput = {
	external_reference: string;
	items: MercadoPagoOrderItemInput[];
	total_amount: number;
	description: string;
	title: string;
};

type MercadoPagoOrderItemInput = {
	sku_number: string;
	category: string;
	title: string;
	description: string;
	unit_price: number;
	quantity: number;
	unit_measure: string;
	total_amount: number;
};

type MercadoPagoOrderOutput = {
	in_store_order_id: string;
	qr_data: string;
};
