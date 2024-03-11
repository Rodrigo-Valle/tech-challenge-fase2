import { ExpressAdapter } from "./api/express-adapter";
import { initRoutes } from "./api/routes/init-router";
import { PrismaConnection } from "./drivers/prisma-client";

const port = Number(process.env.PORT ?? 8000);

const main = async () => {
	PrismaConnection.getInstance().connect();

	const server = new ExpressAdapter();
	initRoutes(server);
	server.listen(port);
};

main()
	.then(() => {
		console.info(` [Server] Servidor rodando na porta ${port}`);
	})
	.catch((err) => {
		console.error(` [Error] Erro na inicialização do servidor: ${err.message}`);
	});
