import { Level, Log } from "@/shared/application/contracts";
import pino from "pino";
import pretty from "pino-pretty";

const prettyOptions = {
	colorize: true,
	singleLine: true,
	ignore: "pid,hostname"
};

export class PinoLogAdapter implements Log {
	private logger: pino.Logger;
	private messageId: string;
	private level: Level;
	private prettyOptions = prettyOptions;

	constructor(messageId: string) {
		this.setLevel();
		this.messageId = messageId;
		this.prepareLogger();
	}

	debug(obj: unknown, msg?: string | undefined): void {
		this.logger.debug(obj, msg);
	}

	info(obj: unknown, msg?: string | undefined): void {
		this.logger.info(obj, msg);
	}

	warn(obj: unknown, msg?: string | undefined): void {
		this.logger.warn(obj, msg);
	}

	error(obj: unknown, msg?: string | undefined): void {
		this.logger.error(obj, msg);
	}

	getMessageId(): string {
		return this.messageId;
	}

	private setLevel(): void {
		if (process.env.NODE_ENV === "production") {
			this.level = Level.INFO;
			return;
		}
		this.level = Level.DEBUG;
	}

	private prepareLogger(): Log {
		const messageId = `(messageId:${this.messageId})`;
		const msg = `${messageId} {msg}`;
		const stream = pretty({ ...this.prettyOptions, messageFormat: msg });
		this.logger = pino({ level: this.level, nestedKey: "payload" }, stream);
		return this;
	}
}
