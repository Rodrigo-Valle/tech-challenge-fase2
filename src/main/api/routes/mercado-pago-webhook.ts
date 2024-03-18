import { RestControllerFactory } from "@/main/factories/controllers";
import { MercadoPagoWebHookController } from "@/order/infra/controllers";
import { HttpServer } from "@/shared/application/contracts";
import { BaseRouter } from "./base-router";

export class MercadoPagoWebHookRouter extends BaseRouter<MercadoPagoWebHookController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/mercadopago/webhook", (params) => this.handleRequest(params, "ReceiveMercadoPagoEvent"));
	}

	static start(httpServer: HttpServer) {
		return new MercadoPagoWebHookRouter(httpServer);
	}

	protected makeController(requestId: string): MercadoPagoWebHookController {
		return RestControllerFactory.makeMercadoPagoWebHookController(requestId);
	}
}
