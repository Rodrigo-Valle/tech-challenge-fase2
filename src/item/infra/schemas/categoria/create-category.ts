import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const createCategorySchema = z.object({
	name: validateStringField({
		fieldName: "name",
		minLenght: 3,
		maxLength: 255
	})
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
