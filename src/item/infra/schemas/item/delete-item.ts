import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const deleteItemSchema = z.object({
	id: validateStringField({
		fieldName: "id"
	})
});

export type DeleteItemDTO = z.infer<typeof deleteItemSchema>;
