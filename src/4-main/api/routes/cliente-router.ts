import { HttpRequest, HttpResponse, HttpServer } from "@/2-application/contracts";
import { RestControllerFactory } from "@/4-main/factories/controllers";

export class ClienteRouter {
	constructor(readonly httpServer: HttpServer) {
		httpServer.on("post", "/cliente", this.cadastrarCliente.bind(this));
	}

	static start(httpServer: HttpServer) {
		return new ClienteRouter(httpServer);
	}

	async cadastrarCliente(params: HttpRequest): Promise<HttpResponse> {
		const controller = RestControllerFactory.makeClienteController();
		const result = await controller.cadastrarCliente(params.body);
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
