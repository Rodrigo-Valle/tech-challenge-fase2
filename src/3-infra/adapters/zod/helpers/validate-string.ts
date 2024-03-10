import { z } from "zod";

type ValidateStringType = { fieldName: string; lenght?: number; minLenght?: number; maxLength?: number };

export const validateStringField = (input: ValidateStringType): z.ZodString => {
	let obj = z.string({
		invalid_type_error: `${input.fieldName} deve ser uma string`,
		required_error: `${input.fieldName} é obrigatório`
	});
	if (input.lenght) {
		obj = obj.length(input.lenght, { message: `${input.fieldName} deve ter ${input.lenght} caracteres` });
	}
	if (input.minLenght && input.maxLength) {
		obj = obj
			.min(input.minLenght, { message: `${input.fieldName} deve ter pelo menos ${input.minLenght} caracteres` })
			.max(input.maxLength, { message: `${input.fieldName} deve ter no máximo ${input.maxLength} caracteres` });
	}
	return obj;
};
