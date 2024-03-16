import { CategoriaUsecasesFactoryInterface } from "@/item/application/contracts";
import { CadastrarCategoriaUsecase } from "@/item/application/usecases/categoria";
import { PrismaCategoriaRepository } from "@/item/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { Log } from "@/shared/contracts";

export class CategoriaUsecasesFactory implements CategoriaUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCadastrarCategoriaUsecase(logger: Log): CadastrarCategoriaUsecase {
		return new CadastrarCategoriaUsecase(logger, this.makeCategoriaRepository());
	}

	private makeCategoriaRepository(): PrismaCategoriaRepository {
		return new PrismaCategoriaRepository(this.prismaClient);
	}
}
