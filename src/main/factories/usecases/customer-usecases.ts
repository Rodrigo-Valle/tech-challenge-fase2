import { CustomerUsecasesFactoryInterface } from "@/customer/application/contracts";
import { CreateCustomerUsecase, FindByCPFUsecase } from "@/customer/application/usecases";
import { PrismaCustomerRepository } from "@/customer/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { Log } from "@/shared/application/contracts";

export class CustomerUsecasesFactory implements CustomerUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCreateCustomerUsecase(logger: Log): CreateCustomerUsecase {
		return new CreateCustomerUsecase(logger, this.makeCustomerRepository());
	}

	makeFindByCPFUsecase(logger: Log): FindByCPFUsecase {
		return new FindByCPFUsecase(logger, this.makeCustomerRepository());
	}

	private makeCustomerRepository(): PrismaCustomerRepository {
		return new PrismaCustomerRepository(this.prismaClient);
	}
}
