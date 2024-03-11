import { z } from "zod";

type ValidateNumberType = {
	fieldName: string;
	mustBePositive: boolean;
};

export const validateNumberField = (input: ValidateNumberType): z.ZodNumber => {
	let obj = z.number({
		invalid_type_error: `${input.fieldName} deve ser um numero`,
		required_error: `${input.fieldName} é obrigatório`
	});
	if (input.mustBePositive === true) {
		obj = obj.positive({ message: `${input.fieldName} deve ser um valor positivo` });
	}
	return obj;
};
