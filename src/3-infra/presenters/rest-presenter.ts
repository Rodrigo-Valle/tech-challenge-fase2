import { AlreadyExistsError } from "@/1-domain/exception";
import { BadRequestError } from "@/1-domain/exception/bad-request";
import { ValidationError } from "@/1-domain/exception/validation";

export type RestOutput = {
	statusCode: number;
	body: any;
};

export class RestPresenter {
	static created = (body: any): RestOutput => {
		return {
			statusCode: 201,
			body
		};
	};

	static ok = (body: any): RestOutput => {
		return {
			statusCode: 200,
			body
		};
	};

	static badRequest = (message: string | string[]): RestOutput => {
		return {
			statusCode: 400,
			body: { message }
		};
	};

	static notFound = (): RestOutput => {
		return {
			statusCode: 404,
			body: { message: "Não encontrado" }
		};
	};

	static error = (error: Error, message: string): RestOutput => {
		let statusCode = 500;
		let data: any;
		if (error instanceof BadRequestError || error instanceof AlreadyExistsError) {
			statusCode = 400;
		}
		if (error instanceof ValidationError) {
			statusCode = 400;
			data = error.getErrors();
		}
		return {
			statusCode,
			body: {
				message,
				data
			}
		};
	};
}
