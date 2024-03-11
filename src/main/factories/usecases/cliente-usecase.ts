import { ClienteUsecasesFactoryInterface } from "@/cliente/application/contracts";
import { BuscarClientePorCPFUsecase, CadastrarClienteUsecase } from "@/cliente/application/usecases";
import { PrismaClienteRepository } from "@/cliente/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { Log } from "@/shared/contracts";

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
