import { validateNumberField, validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const cadastrarItemSchema = z.object({
	nome: validateStringField({
		fieldName: "nome",
		minLenght: 3,
		maxLength: 255
	}),
	preco: validateNumberField({
		fieldName: "preco",
		mustBePositive: true
	}),
	idCategoria: validateStringField({
		fieldName: "idCategoria"
	})
});

export type CadastrarItemDTO = z.infer<typeof cadastrarItemSchema>;
