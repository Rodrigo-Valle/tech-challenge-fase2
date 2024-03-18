import { ItemController } from "@/item/infra/controllers";
import { RestControllerFactory } from "@/main/factories/controllers";
import { HttpServer } from "@/shared/application/contracts";
import { BaseRouter } from "./base-router";

export class ItemRouter extends BaseRouter<ItemController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/item", (params) => this.handleRequest(params, "CreateItem"));
		httpServer.on("patch", "/item/:id", (params) => this.handleRequest(params, "EditItem"));
		httpServer.on("delete", "/item/:id", (params) => this.handleRequest(params, "DeleteItem"));
		httpServer.on("get", "/item/categoria/:categoryId", (params) => this.handleRequest(params, "FindByCategory"));
	}

	static start(httpServer: HttpServer) {
		return new ItemRouter(httpServer);
	}

	protected makeController(requestId: string): ItemController {
		return RestControllerFactory.makeItemController(requestId);
	}
}
