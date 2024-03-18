import { PaymentGateway } from "@/order/application/contracts";
import { Order } from "@/order/domain/entities/order";
import { HttpClient } from "@/shared/application/contracts";

export class MercadoPagoPaymentGateway implements PaymentGateway {
	private readonly baseUrl = "https://api.mercadopago.com/";
	private readonly generateQrCodeUrl =
		`instore/orders/qr/seller/collectors/${process.env.USER_ID}/pos/${process.env.ID_POS}/qrs`;
	private readonly getPaymentDataUrl = "v1/payments";

	constructor(private readonly httpClient: HttpClient) {}

	async generateQrCode(pedido: Order): Promise<string> {
		const input = this.mapPedidoToMercadoPagoInput(pedido);
		const result = await this.httpClient.post<MercadoPagoOrderInput, MercadoPagoOrderOutput>({
			url: `${this.baseUrl}${this.generateQrCodeUrl}`,
			body: input,
			params: {
				headers: {
					Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
				}
			}
		});
		return result.data.qr_data;
	}

	async getPaymentData(paymentId: string): Promise<{ paymentStatus: string; orderId: string }> {
		const result = await this.httpClient.get<MercadoPagoPaymentOutput>({
			url: `${this.baseUrl}${this.getPaymentDataUrl}/${paymentId}`,
			params: {
				headers: {
					Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
				}
			}
		});
		return {
			paymentStatus: this.mapStatusReturned(result.data.status),
			orderId: result.data.external_reference
		};
	}

	private mapStatusReturned(externalReference: MercadoPagoStatus): string {
		switch (externalReference) {
			case "approved":
				return "Aprovado";
			case "rejected":
				return "Rejeitado";
			case "pending":
				return "Pendente";
			case "cancelled":
				return "Cancelado";
			default:
				throw new Error("Status inválido");
		}
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

type MercadoPagoPaymentOutput = {
	external_reference: string;
	status: MercadoPagoStatus;
};

type MercadoPagoStatus = "approved" | "rejected" | "pending" | "cancelled";
