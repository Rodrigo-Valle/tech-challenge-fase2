import { z } from "zod";
import { validateStringField } from "../../../shared/infra/adapters/zod/validate-string";

export const createCustomerSchema = z.object({
	name: validateStringField({
		fieldName: "name",
		minLenght: 3,
		maxLength: 255
	}),
	email: validateStringField({
		fieldName: "email",
		minLenght: 3,
		maxLength: 255
	}),
	cpf: validateStringField({
		fieldName: "cpf",
		lenght: 11
	})
});

export type CreateCustomerDTO = z.infer<typeof createCustomerSchema>;
