import { HttpServer } from "@/shared/contracts";
import { ClienteRouter } from "./cliente-router";

export const initRoutes = (server: HttpServer): void => {
	ClienteRouter.start(server);
};
