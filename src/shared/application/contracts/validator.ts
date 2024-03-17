export interface Validator {
	validate<T>(data: unknown, schema: unknown): T;
}
