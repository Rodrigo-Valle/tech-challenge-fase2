import { HttpServer } from "@/shared/application/contracts";
import { CategoriaRouter } from "./categoria-router";
import { ClienteRouter } from "./cliente-router";
import { ItemRouter } from "./item-router";
import { PedidoRouter } from "./pedido-router";

export const initRoutes = (server: HttpServer): void => {
	ClienteRouter.start(server);
	ItemRouter.start(server);
	CategoriaRouter.start(server);
	PedidoRouter.start(server);
};
