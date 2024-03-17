import { RestControllerFactory } from "@/main/factories/controllers";
import { RestPedidoController } from "@/pedido/infra/controllers";
import { HttpServer } from "@/shared/application/contracts";
import { BaseRouter } from "./base-router";

export class PedidoRouter extends BaseRouter<RestPedidoController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/pedido", (params) => this.handleRequest(params, "criarPedido"));
		httpServer.on("post", "/pedido/mercadopago/qrcode", (params) =>
			this.handleRequest(params, "criarPedidoComMercadoPagoQrCode")
		);
	}

	static start(httpServer: HttpServer) {
		return new PedidoRouter(httpServer);
	}

	protected makeController(requestId: string): RestPedidoController {
		return RestControllerFactory.makePedidoController(requestId);
	}
}
