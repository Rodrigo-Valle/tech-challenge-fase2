import { RestClienteController } from "@/cliente/infra/controllers";
import { RestControllerFactory } from "@/main/factories/controllers";
import { HttpServer } from "@/shared/contracts";
import { BaseRouter } from "./base-router";

export class ClienteRouter extends BaseRouter<RestClienteController> {
	constructor(readonly httpServer: HttpServer) {
		super();
		httpServer.on("post", "/cliente", (params) => this.handleRequest(params, "cadastrarCliente"));
		httpServer.on("get", "/cliente/cpf/:cpf", (params) => this.handleRequest(params, "buscarClientePorCPF"));
	}

	static start(httpServer: HttpServer) {
		return new ClienteRouter(httpServer);
	}

	protected makeController(requestId: string): RestClienteController {
		return RestControllerFactory.makeClienteController(requestId);
	}
}
