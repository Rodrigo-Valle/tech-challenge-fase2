import { CadastrarClienteUsecase } from "@/2-application/usecases";
import { PrismaClienteRepository } from "@/3-infra/prisma/prisma-cliente-repository";
import { PrismaConnection } from "../../drivers/prisma-client";

export class ClienteUsecasesFactory {
	static prismaClient = PrismaConnection.getInstance().getClient();

	static makeCadastrarClienteUsecase(): CadastrarClienteUsecase {
		const clienteRepository = new PrismaClienteRepository(ClienteUsecasesFactory.prismaClient);
		return new CadastrarClienteUsecase(clienteRepository);
	}
}
