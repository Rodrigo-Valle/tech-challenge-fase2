export type RestOutput = {
	success: boolean;
	statusCode: number;
	data?: unknown;
	message?: string;
};

export type RestInput = {
	body: Record<string, unknown>;
	params: Record<string, unknown>;
	query: Record<string, unknown>;
};
