export interface HttpServer {
	on: (method: RestMethod, url: string, callback: CallbackFunction) => void;
	listen: (port: number) => void;
}

export type RestMethod = "get" | "post" | "put" | "delete";

export type CallbackFunction = (params: HttpRequest) => Promise<HttpResponse>;

export interface HttpRequest {
	params?: unknown;
	body?: unknown;
	query?: unknown;
}

export interface HttpResponse {
	statusCode: number;
	body: unknown;
}
