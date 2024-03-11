import { z } from "zod";
import { validateStringField } from "../helpers/validate-string";

export const buscarClientePorCpfSchema = z.object({
	cpf: validateStringField({
		fieldName: "cpf",
		lenght: 11
	})
});

export type BuscarClientePorCpfDTO = z.infer<typeof buscarClientePorCpfSchema>;
