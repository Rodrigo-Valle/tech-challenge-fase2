import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const buscarClientePorCpfSchema = z.object({
	cpf: validateStringField({
		fieldName: "cpf",
		lenght: 11
	})
});

export type BuscarClientePorCpfDTO = z.infer<typeof buscarClientePorCpfSchema>;
