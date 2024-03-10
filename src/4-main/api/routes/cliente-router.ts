import { HttpRequest, HttpResponse, HttpServer, RestOutput } from "@/2-application/contracts";
import { RestClienteController } from "@/3-infra/controllers";
import { RestControllerFactory } from "@/4-main/factories/controllers";

export class ClienteRouter {
	constructor(readonly httpServer: HttpServer) {
		httpServer.on("post", "/cliente", (params) => this.handleRequest(params, "cadastrarCliente"));
		httpServer.on("get", "/cliente/cpf/:cpf", (params) => this.handleRequest(params, "buscarClientePorCPF"));
	}

	static start(httpServer: HttpServer) {
		return new ClienteRouter(httpServer);
	}

	private async handleRequest(params: HttpRequest, methodName: keyof RestClienteController): Promise<HttpResponse> {
		const controller = RestControllerFactory.makeClienteController(params.requestId);
		const result = await controller[methodName]({ ...params });
		return this.buildResponse(result);
	}

	private buildResponse(result: RestOutput): HttpResponse {
		return {
			statusCode: result.statusCode,
			body: {
				status: result.success ? "sucesso" : "erro",
				message: result.message ?? undefined,
				data: result.data ?? undefined
			}
		};
	}
}
