import { CustomerController } from "@/customer/infra/controllers";
import { RestControllerFactory } from "@/main/factories/controllers";
import { HttpServer } from "@/shared/application/contracts";
import { BaseRouter } from "./base-router";

export class CustomerRouter extends BaseRouter<CustomerController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/cliente", (params) => this.handleRequest(params, "CreateCustomer"));
		httpServer.on("get", "/cliente/cpf/:cpf", (params) => this.handleRequest(params, "FindByCPF"));
	}

	static start(httpServer: HttpServer) {
		return new CustomerRouter(httpServer);
	}

	protected makeController(requestId: string): CustomerController {
		return RestControllerFactory.makeCustomerController(requestId);
	}
}
