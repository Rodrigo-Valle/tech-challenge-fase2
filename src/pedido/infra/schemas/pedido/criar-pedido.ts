import { validateNumberField, validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const criarPedidoSchema = z.object({
	clienteId: validateStringField({
		fieldName: "clienteId"
	}).nullable(),
	items: z.array(
		z.object({
			id: validateStringField({
				fieldName: "id"
			}),
			quantidade: validateNumberField({
				fieldName: "quantidade",
				mustBePositive: true,
				min: 1
			})
		})
	)
});

export type CriarPedidoDTO = z.infer<typeof criarPedidoSchema>;
