import { validateNumberField, validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const editarItemSchema = z.object({
	id: validateStringField({
		fieldName: "id"
	}),
	nome: validateStringField({
		fieldName: "nome",
		minLenght: 3,
		maxLength: 255
	}),
	preco: validateNumberField({
		fieldName: "preco",
		mustBePositive: true
	})
});

export type EditarItemDTO = z.infer<typeof editarItemSchema>;
