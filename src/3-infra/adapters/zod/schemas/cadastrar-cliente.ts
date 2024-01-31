import { z } from "zod";

export const cadastrarClienteSchema = z.object({
	nome: z.string().min(3).max(255),
	email: z.string().email().max(255),
	cpf: z.string().length(11)
});

export type CadastrarClienteDTO = z.infer<typeof cadastrarClienteSchema>;
