export interface HttpClient {
	get: <O>(input: HttpInput<never>) => Promise<HttpResult<O>>;
	post: <I, O>(input: HttpInput<I>) => Promise<HttpResult<O>>;
	put: <I, O>(input: HttpInput<I>) => Promise<HttpResult<O>>;
	patch: <I, O>(input: HttpInput<I>) => Promise<HttpResult<O>>;
	delete: <O>(input: HttpInput<never>) => Promise<HttpResult<O>>;
}

export interface HttpInput<I> {
	url: string;
	params?: Record<string, unknown>;
	body: I;
}

export interface HttpResult<O> {
	data: O;
	status: number;
	headers: Record<string, unknown>;
}
