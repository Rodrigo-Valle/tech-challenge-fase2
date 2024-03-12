import { RestItemController } from "@/item/infra/controllers";
import { RestControllerFactory } from "@/main/factories/controllers";
import { HttpServer } from "@/shared/contracts";
import { BaseRouter } from "./base-router";

export class ItemRouter extends BaseRouter<RestItemController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/item", (params) => this.handleRequest(params, "cadastrarItem"));
		httpServer.on("patch", "/item/:id", (params) => this.handleRequest(params, "editarItem"));
		httpServer.on("delete", "/item/:id", (params) => this.handleRequest(params, "deletarItem"));
	}

	static start(httpServer: HttpServer) {
		return new ItemRouter(httpServer);
	}

	protected makeController(requestId: string): RestItemController {
		return RestControllerFactory.makeItemController(requestId);
	}
}
