import { validateNumberField, validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

type Data = {
	id: string;
	name?: string;
	price?: number;
	[key: string]: string | number | undefined;
};

export const editItemSchema = z
	.object({
		id: validateStringField({
			fieldName: "id"
		}),
		name: validateStringField({
			fieldName: "name",
			minLenght: 3,
			maxLength: 255
		}).optional(),
		price: validateNumberField({
			fieldName: "price",
			mustBePositive: true
		}).optional()
	})
	.refine((data: Data) => Object.keys(data).some((key) => key !== "id" && data[key] !== null), {
		message: "Pelo menos um campo deve ser preenchido para atualizar o item",
		path: ["data"]
	});

export type EditItemDTO = z.infer<typeof editItemSchema>;
