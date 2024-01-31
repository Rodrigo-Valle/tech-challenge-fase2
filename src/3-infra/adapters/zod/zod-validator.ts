import { ValidationError } from "@/1-domain/exception/validation";
import { Validator } from "@/2-application/contracts";
import { ZodObject, ZodRawShape } from "zod";

export class ZodValidator implements Validator {
	validate<T extends ZodRawShape>(input: unknown, schema: ZodObject<T>): void {
		const result = schema.safeParse(input);
		if (!result.success) {
			throw new ValidationError(
				result.error.issues.map((issue) => {
					return `${issue.path.join(".")}: ${issue.message}`;
				})
			);
		}
	}
}
