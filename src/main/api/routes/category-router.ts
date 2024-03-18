import { CategoryController } from "@/item/infra/controllers/category";
import { RestControllerFactory } from "@/main/factories/controllers";
import { HttpServer } from "@/shared/application/contracts";
import { BaseRouter } from "./base-router";

export class CategoryRouter extends BaseRouter<CategoryController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/categoria", (params) => this.handleRequest(params, "CreateCategory"));
	}

	static start(httpServer: HttpServer) {
		return new CategoryRouter(httpServer);
	}

	protected makeController(requestId: string): CategoryController {
		return RestControllerFactory.makeCategoryController(requestId);
	}
}
