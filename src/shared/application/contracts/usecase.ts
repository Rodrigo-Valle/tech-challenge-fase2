import { Log } from "@/shared/application/contracts";

export interface Usecase<I, O> {
	execute(input: I): O | Promise<O>;
}

export abstract class BaseUsecase {
	protected readonly logger: Log;

	constructor(logger: Log) {
		this.logger = logger;
	}
}
