import { CallbackFunction, HttpServer, RestMethod } from "@/2-application/contracts";
import cors from "cors";
import express, { type Request, type Response, type Express } from "express";
import { swaggerMiddleware } from "./swagger-middleware";

export class ExpressAdapter implements HttpServer {
	app: Express;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
		if (process.env.NODE_ENV !== "prod") swaggerMiddleware(this.app);
	}

	on(method: RestMethod, url: string, callback: CallbackFunction): void {
		this.app[method](url, async (request: Request, response: Response) => {
			const output = await callback({ params: request.params, body: request.body, query: request.query });
			response.status(output.statusCode).json(output.body);
		});
	}

	listen(port: number): void {
		this.app.listen(port);
	}
}
