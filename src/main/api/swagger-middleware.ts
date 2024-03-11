import type { Express } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger/options";

export const swaggerMiddleware = (app: Express): void => {
	const swaggerDocs = swaggerJsDoc(swaggerOptions);
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
