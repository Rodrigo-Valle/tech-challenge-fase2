import { ItemUsecasesFactoryInterface } from "@/item/application/contracts";
import { CadastrarItemUsecase } from "@/item/application/usecase/cadastrar-item";
import { PrismaCategoriaRepository, PrismaItemRepository } from "@/item/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { Log } from "@/shared/contracts";

export class ItemUsecasesFactory implements ItemUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCadastrarItemUsecase(logger: Log): CadastrarItemUsecase {
		return new CadastrarItemUsecase(logger, this.makeItemRepository(), this.makeCategoriaRepository());
	}

	private makeItemRepository(): PrismaItemRepository {
		return new PrismaItemRepository(this.prismaClient);
	}

	private makeCategoriaRepository(): PrismaCategoriaRepository {
		return new PrismaCategoriaRepository(this.prismaClient);
	}
}
