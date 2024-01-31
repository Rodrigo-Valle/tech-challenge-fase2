export interface Validator {
	validate: (data: any, schema: any) => void;
}
