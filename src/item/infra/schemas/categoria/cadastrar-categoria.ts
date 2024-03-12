import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const cadastrarCategoriaSchema = z.object({
	nome: validateStringField({
		fieldName: "nome",
		minLenght: 3,
		maxLength: 255
	})
});

export type CadastrarCategoriaDTO = z.infer<typeof cadastrarCategoriaSchema>;
