import { RestControllerFactory } from "@/main/factories/controllers";
import { RestPedidoController } from "@/pedido/infra/controllers";
import { HttpServer } from "@/shared/contracts";
import { BaseRouter } from "./base-router";

export class PedidoRouter extends BaseRouter<RestPedidoController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/pedido", (params) => this.handleRequest(params, "criarPedido"));
	}

	static start(httpServer: HttpServer) {
		return new PedidoRouter(httpServer);
	}

	protected makeController(requestId: string): RestPedidoController {
		return RestControllerFactory.makePedidoController(requestId);
	}
}
