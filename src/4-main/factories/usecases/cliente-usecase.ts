import { ClienteUsecasesFactoryInterface, Log } from "@/2-application/contracts";
import { BuscarClientePorCPFUsecase, CadastrarClienteUsecase } from "@/2-application/usecases";
import { PrismaClienteRepository } from "@/3-infra/prisma/prisma-cliente-repository";
import { PrismaConnection } from "@/4-main/drivers";

export class ClienteUsecasesFactory implements ClienteUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCadastrarClienteUsecase(logger: Log): CadastrarClienteUsecase {
		return new CadastrarClienteUsecase(logger, this.makeClienteRepository());
	}

	makeBuscarClientePorCpfUsecase(logger: Log): BuscarClientePorCPFUsecase {
		return new BuscarClientePorCPFUsecase(logger, this.makeClienteRepository());
	}

	private makeClienteRepository(): PrismaClienteRepository {
		return new PrismaClienteRepository(this.prismaClient);
	}
}
