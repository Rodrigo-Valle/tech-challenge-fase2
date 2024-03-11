import { HttpServer } from "@/shared/contracts";
import { ClienteRouter } from "./cliente-router";
import { ItemRouter } from "./item-router";

export const initRoutes = (server: HttpServer): void => {
	ClienteRouter.start(server);
	ItemRouter.start(server);
};
