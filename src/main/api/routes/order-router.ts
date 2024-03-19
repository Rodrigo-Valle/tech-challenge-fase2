import { RestControllerFactory } from "@/main/factories/controllers";
import { OrderController } from "@/order/infra/controllers";
import { HttpServer } from "@/shared/application/contracts";
import { BaseRouter } from "./base-router";

export class OrderRouter extends BaseRouter<OrderController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("get", "/pedido", (params) => this.handleRequest(params, "GetOrderOrderedByStatus"));
		httpServer.on("post", "/pedido", (params) => this.handleRequest(params, "CreateOrder"));
		httpServer.on("post", "/pedido/mercadopago/qrcode", (params) =>
			this.handleRequest(params, "CreateOrderWithMercadoPagoQrCode")
		);
	}

	static start(httpServer: HttpServer) {
		return new OrderRouter(httpServer);
	}

	protected makeController(requestId: string): OrderController {
		return RestControllerFactory.makeOrderController(requestId);
	}
}
