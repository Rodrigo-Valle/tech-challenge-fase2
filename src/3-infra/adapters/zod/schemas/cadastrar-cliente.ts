import { z } from "zod";
import { validateStringField } from "../helpers/validate-string";

export const cadastrarClienteSchema = z.object({
	nome: validateStringField({
		fieldName: "nome",
		minLenght: 3,
		maxLength: 255
	}),
	email: validateStringField({
		fieldName: "email",
		minLenght: 3,
		maxLength: 255
	}),
	cpf: validateStringField({
		fieldName: "cpf",
		lenght: 11
	})
});

export type CadastrarClienteDTO = z.infer<typeof cadastrarClienteSchema>;
