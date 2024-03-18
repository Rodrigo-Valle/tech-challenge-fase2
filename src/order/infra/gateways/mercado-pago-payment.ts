import { PaymentGateway } from "@/order/application/contracts";
import { Order } from "@/order/domain/entities/order";
import { HttpClient } from "@/shared/application/contracts";

export class MercadoPagoPaymentGateway implements PaymentGateway {
	private readonly baseUrl =
		`https://api.mercadopago.com/instore/orders/qr/seller/collectors/${process.env.ID_LOJA}/pos/${process.env.ID_POS}/qrs`;

	constructor(private readonly httpClient: HttpClient) {}

	async generateQrCode(pedido: Order): Promise<string> {
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

	private mapPedidoToMercadoPagoInput(order: Order): MercadoPagoOrderInput {
		const orderData = order.toJson();
		return {
			external_reference: orderData.id,
			total_amount: Number(orderData.totalValue),
			description: `Pedido: ${orderData.id} | Loja: ${process.env.ID_LOJA} | Pos: ${process.env.ID_POS}`,
			title: `Venda: ${orderData.id}`,
			items: orderData.items.map((itemPedido) => {
				return {
					sku_number: itemPedido.id,
					category: itemPedido.item.category.name,
					title: itemPedido.item.name,
					description: "",
					quantity: itemPedido.quantity,
					unit_measure: "unit",
					unit_price: Number(itemPedido.item.price),
					total_amount: Number(itemPedido.totalValue)
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
