import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const findByCpfSchema = z.object({
	cpf: validateStringField({
		fieldName: "cpf",
		lenght: 11
	})
});

export type FindByCpfDTO = z.infer<typeof findByCpfSchema>;
