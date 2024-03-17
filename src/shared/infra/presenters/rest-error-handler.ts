import { RestOutput } from "@/shared/application/contracts";
import {
	AlreadyExistsError,
	BadRequestError,
	NotFoundError,
	PaymentError,
	ValidationError
} from "@/shared/domain/exception";
import { BaseError } from "@/shared/domain/exception/base-error";

export class RestErrorHandler {
	static readonly handleError = (error: unknown): RestOutput => {
		if (error instanceof BadRequestError) return this.badRequest(error);
		if (error instanceof ValidationError) return this.badRequest(error);
		if (error instanceof NotFoundError) return this.notFound(error);
		if (error instanceof PaymentError) return this.badGateway(error);
		if (error instanceof AlreadyExistsError) return this.unprocessableEntity(error);
		return this.unexpectedError(error);
	};

	private static readonly unprocessableEntity = (error: BaseError): RestOutput => {
		return {
			success: false,
			statusCode: 422,
			data: error.detail,
			message: error.message
		};
	};

	private static readonly badRequest = (error: BaseError): RestOutput => {
		return {
			success: false,
			statusCode: 400,
			data: error.detail ? { erros: error.detail } : undefined,
			message: error.message
		};
	};

	private static readonly notFound = (error: BaseError): RestOutput => {
		return {
			success: false,
			statusCode: 404,
			message: error.message
		};
	};

	private static readonly badGateway = (error: BaseError): RestOutput => {
		return {
			success: false,
			statusCode: 502,
			message: error.message
		};
	};

	private static readonly unexpectedError = (error: unknown): RestOutput => {
		console.error(error, "Erro inesperado no servidor");
		return {
			success: false,
			statusCode: 500,
			message: "Erro imprevisto do servidor, entre em contato com um administrador do sistema."
		};
	};
}
