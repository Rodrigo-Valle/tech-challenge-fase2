import { Log } from "@/2-application/contracts";

export abstract class BaseUsecase {
	protected readonly logger: Log;

	constructor(logger: Log) {
		this.logger = logger;
	}
}
