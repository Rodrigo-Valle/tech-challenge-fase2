import { Validator } from "@/shared/application/contracts";
import { ValidationError } from "@/shared/domain/exception/validation-error";
import { ZodObject, ZodRawShape } from "zod";

export class ZodValidator implements Validator {
	validate<T, S extends ZodRawShape>(input: unknown, schema: ZodObject<S>): T {
		const result = schema.safeParse(input);
		if (!result.success) {
			throw new ValidationError(
				result.error.issues.map((issue) => {
					return `${issue.path.join(".")}: ${issue.message}`;
				})
			);
		}
		return result.data as T;
	}
}
