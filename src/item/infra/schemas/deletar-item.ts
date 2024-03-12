import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const deletarItemSchema = z.object({
	id: validateStringField({
		fieldName: "id"
	})
});

export type DeletarItemDTO = z.infer<typeof deletarItemSchema>;
