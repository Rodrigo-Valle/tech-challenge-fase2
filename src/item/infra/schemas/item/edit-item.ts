import { validateNumberField, validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const editItemSchema = z.object({
	id: validateStringField({
		fieldName: "id"
	}),
	name: validateStringField({
		fieldName: "name",
		minLenght: 3,
		maxLength: 255
	}),
	price: validateNumberField({
		fieldName: "price",
		mustBePositive: true
	})
});

export type EditItemDTO = z.infer<typeof editItemSchema>;
