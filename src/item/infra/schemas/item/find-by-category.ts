import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const findByCategorySchema = z.object({
	categoryId: validateStringField({
		fieldName: "categoryId"
	})
});

export type FindByCategoryDTO = z.infer<typeof findByCategorySchema>;
