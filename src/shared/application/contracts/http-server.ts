export interface HttpServer {
	on: (method: RestMethod, url: string, callback: CallbackFunction) => void;
	listen: (port: number) => void;
}

export type RestMethod = "get" | "post" | "put" | "delete" | "patch";

export type CallbackFunction = (params: HttpRequest) => Promise<HttpResponse>;

export interface HttpRequest {
	body: Record<string, unknown>;
	params: Record<string, unknown>;
	query: Record<string, unknown>;
	requestId: string;
}

export interface HttpResponse {
	statusCode: number;
	body: unknown;
}
