import { HttpServer } from "@/shared/contracts";
import { CategoriaRouter } from "./categoria-router";
import { ClienteRouter } from "./cliente-router";
import { ItemRouter } from "./item-router";

export const initRoutes = (server: HttpServer): void => {
	ClienteRouter.start(server);
	ItemRouter.start(server);
	CategoriaRouter.start(server);
};
