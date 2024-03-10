export type RestOutput = {
	success: boolean;
	statusCode: number;
	data?: unknown;
	message?: string;
};

export type RestInput = {
	body: unknown;
	params: unknown;
	query: unknown;
};
