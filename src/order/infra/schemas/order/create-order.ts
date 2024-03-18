import { validateNumberField, validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const createOrderSchema = z.object({
	customerId: validateStringField({
		fieldName: "customerId"
	}).nullable(),
	items: z.array(
		z.object({
			id: validateStringField({
				fieldName: "id"
			}),
			quantity: validateNumberField({
				fieldName: "quantity",
				mustBePositive: true,
				min: 1
			})
		})
	)
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
