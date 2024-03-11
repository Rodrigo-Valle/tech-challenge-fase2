import { HttpRequest, HttpResponse, RestOutput } from "@/shared/contracts";

export abstract class BaseRouter<T extends { [K in keyof T]: (params: HttpRequest) => Promise<RestOutput> }> {
	protected abstract makeController(requestId: string): T;

	protected async handleRequest(params: HttpRequest, methodName: keyof T): Promise<HttpResponse> {
		const controller = this.makeController(params.requestId);
		const result = await controller[methodName]({ ...params });
		return this.buildResponse(result);
	}

	protected buildResponse(result: RestOutput): HttpResponse {
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
