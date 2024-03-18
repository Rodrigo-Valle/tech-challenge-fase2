import { validateNumberField, validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const createItemSchema = z.object({
	name: validateStringField({
		fieldName: "name",
		minLenght: 3,
		maxLength: 255
	}),
	price: validateNumberField({
		fieldName: "price",
		mustBePositive: true
	}),
	categoryId: validateStringField({
		fieldName: "categoryId"
	})
});

export type CreateItemDTO = z.infer<typeof createItemSchema>;
