export type Output = {
	success: boolean;
	statusCode: number;
	data?: unknown;
	message?: string;
};

export type Input = {
	body: Record<string, unknown>;
	params: Record<string, unknown>;
	query: Record<string, unknown>;
};
