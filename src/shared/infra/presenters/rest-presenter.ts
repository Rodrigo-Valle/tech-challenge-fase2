import { Output } from "@/shared/application/contracts";
import { RestErrorHandler } from "@/shared/infra/presenters";

export class RestPresenter {
	static readonly created = (data: unknown): Output => {
		return {
			statusCode: 201,
			data,
			success: true
		};
	};

	static readonly ok = (data?: unknown): Output => {
		return {
			statusCode: 200,
			data: data ?? undefined,
			success: true
		};
	};

	static readonly error = (error: unknown): Output => {
		return RestErrorHandler.handleError(error);
	};
}
