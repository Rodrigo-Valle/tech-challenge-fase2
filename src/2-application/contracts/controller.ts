type SuccessOutput = {
	success: true;
	data?: any;
	message?: string;
	error?: never;
};

type FailureOutput = {
	success: false;
	error: Error;
	message: string;
	data?: never;
};

export type ControllerOutput = SuccessOutput | FailureOutput;
