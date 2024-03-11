import { RestCategoriaController } from "@/item/infra/controllers/categoria-controller";
import { RestControllerFactory } from "@/main/factories/controllers";
import { HttpServer } from "@/shared/contracts";
import { BaseRouter } from "./base-router";

export class CategoriaRouter extends BaseRouter<RestCategoriaController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/categoria", (params) => this.handleRequest(params, "cadastrarCategoria"));
	}

	static start(httpServer: HttpServer) {
		return new CategoriaRouter(httpServer);
	}

	protected makeController(requestId: string): RestCategoriaController {
		return RestControllerFactory.makeCategoriaController(requestId);
	}
}
