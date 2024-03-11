export const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Tech Challenge API",
			version: "1.0.0"
		}
	},
	apis: ["./src/main/api/swagger/cliente-api.ts"]
};
