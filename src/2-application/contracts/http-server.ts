export interface HttpServer {
	on: (method: RestMethod, url: string, callback: CallbackFunction) => void;
	listen: (port: number) => void;
}

export type RestMethod = "get" | "post" | "put" | "delete";

export type CallbackFunction = (params: HttpRequest) => Promise<HttpResponse>;

export interface HttpRequest {
	params?: any;
	body?: any;
	query?: any;
}

export interface HttpResponse {
	statusCode: number;
	body: any;
}
