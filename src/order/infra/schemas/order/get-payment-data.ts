import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const getPaymentDataSchema = z.object({
	id: validateStringField({
		fieldName: "id"
	})
});

export type GetPaymentDataDTO = z.infer<typeof getPaymentDataSchema>;
