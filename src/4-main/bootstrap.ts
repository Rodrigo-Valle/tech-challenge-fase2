import { ExpressAdapter } from "./api/express-adapter";
import { ClienteRouter } from "./api/routes/cliente-router";
import { PrismaConnection } from "./drivers/prisma-client";

const port = Number(process.env.PORT ?? 8000);

const main = async () => {
	PrismaConnection.getInstance().connect();

	const server = new ExpressAdapter();
	ClienteRouter.start(server);
	server.listen(port);
};

main()
	.then(() => {
		console.info(` [Server] Servidor rodando na porta ${port}`);
	})
	.catch((err) => {
		console.error(` [Error] Erro na inicialização do servidor: ${err.message}`);
	});
