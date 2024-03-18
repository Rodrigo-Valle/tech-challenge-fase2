import { type HttpClient, type HttpInput, type HttpResult } from "@/shared/application/contracts";
import { HttpClientError, ServerError } from "@/shared/domain/exception";
import axios, { AxiosError } from "axios";

export class AxiosHttpClientAdapter implements HttpClient {
	async get<O>({ url, params }: HttpInput<never>): Promise<HttpResult<O>> {
		try {
			const response = await axios.get(url, { ...params });
			return { data: response.data, status: response.status, headers: response.headers };
		} catch (error) {
			throw this.treatAxiosError(error, url);
		}
	}

	async post<I, O>({ url, body, params }: HttpInput<I>): Promise<HttpResult<O>> {
		try {
			const response = await axios.post(url, body, { ...params });
			return { data: response.data, status: response.status, headers: response.headers };
		} catch (error) {
			throw this.treatAxiosError(error, url);
		}
	}

	async put<I, O>({ url, body, params }: HttpInput<I>): Promise<HttpResult<O>> {
		try {
			const response = await axios.put(url, body, { ...params });
			return { data: response.data, status: response.status, headers: response.headers };
		} catch (error) {
			throw this.treatAxiosError(error, url);
		}
	}

	async patch<I, O>({ url, body, params }: HttpInput<I>): Promise<HttpResult<O>> {
		try {
			const response = await axios.patch(url, body, { ...params });
			return { data: response.data, status: response.status, headers: response.headers };
		} catch (error) {
			throw this.treatAxiosError(error, url);
		}
	}

	async delete<O>({ url, params }: HttpInput<never>): Promise<HttpResult<O>> {
		try {
			const response = await axios.delete(url, { ...params });
			return { data: response.data, status: response.status, headers: response.headers };
		} catch (error) {
			throw this.treatAxiosError(error, url);
		}
	}

	private treatAxiosError(error: unknown, url: string): Error {
		if (error instanceof AxiosError) {
			return new HttpClientError(error.message, error.response?.data, error.response?.status);
		}
		if (error instanceof Error) {
			return new ServerError(`Erro ao realizar requisição para a url: ${url}`, error.message);
		}
		return new ServerError(`Erro ao realizar requisição para a url: ${url}`, error);
	}
}
