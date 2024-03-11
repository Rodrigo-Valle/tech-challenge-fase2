export enum Level {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error"
}

export interface Log {
	debug: (obj: unknown, msg?: string | undefined) => void;
	info: (obj: unknown, msg?: string | undefined) => void;
	warn: (obj: unknown, msg?: string | undefined) => void;
	error: (obj: unknown, msg?: string | undefined) => void;
}
