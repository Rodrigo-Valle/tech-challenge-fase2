import { HttpServer } from "@/shared/application/contracts";
import { CategoryRouter } from "./category-router";
import { CustomerRouter } from "./customer-router";
import { ItemRouter } from "./item-router";
import { OrderRouter } from "./order-router";

export const initRoutes = (server: HttpServer): void => {
	CustomerRouter.start(server);
	ItemRouter.start(server);
	CategoryRouter.start(server);
	OrderRouter.start(server);
};
