import { z } from "zod";

type ValidateNumberType = {
	fieldName: string;
	mustBePositive: boolean;
	min?: number;
};

export const validateNumberField = (input: ValidateNumberType): z.ZodNumber => {
	let obj = z.number({
		invalid_type_error: `${input.fieldName} deve ser um numero`,
		required_error: `${input.fieldName} é obrigatório`
	});
	if (input.mustBePositive === true) {
		obj = obj.positive({ message: `${input.fieldName} deve ser um valor positivo` });
	}
	if (input.min) {
		obj = obj.min(input.min, { message: `${input.fieldName} deve ser no minimo ${input.min}` });
	}
	return obj;
};
