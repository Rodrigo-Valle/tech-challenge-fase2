import { RestItemController } from "@/item/infra/controllers";
import { RestControllerFactory } from "@/main/factories/controllers";
import { HttpServer } from "@/shared/contracts";
import { BaseRouter } from "./base-router";

export class ItemRouter extends BaseRouter<RestItemController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/item", (params) => this.handleRequest(params, "cadastrarItem"));
	}

	static start(httpServer: HttpServer) {
		return new ItemRouter(httpServer);
	}

	protected makeController(requestId: string): RestItemController {
		return RestControllerFactory.makeItemController(requestId);
	}
}
