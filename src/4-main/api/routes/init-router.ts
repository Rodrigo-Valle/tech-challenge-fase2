import { HttpServer } from "@/2-application/contracts";
import { ClienteRouter } from "./cliente-router";

export const initRoutes = (server: HttpServer): void => {
	ClienteRouter.start(server);
};
