import crypto from "crypto";

export const generateRequestId = (): string => {
	return crypto.randomUUID().split("-")[0];
};
