import { RestOutput } from "@/shared/contracts";
import { RestErrorHandler } from "@/shared/infra/presenters";

export class RestPresenter {
	static readonly created = (data: unknown): RestOutput => {
		return {
			statusCode: 201,
			data,
			success: true
		};
	};

	static readonly ok = (data: unknown): RestOutput => {
		return {
			statusCode: 200,
			data: data ?? undefined,
			success: true
		};
	};

	static readonly error = (error: unknown): RestOutput => {
		return RestErrorHandler.handleError(error);
	};
}
