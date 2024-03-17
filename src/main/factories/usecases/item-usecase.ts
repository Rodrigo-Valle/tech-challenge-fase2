import { ItemUsecasesFactoryInterface } from "@/item/application/contracts";
import {
	BuscatItemPorCategoriaUsecase,
	CadastrarItemUsecase,
	DeletarItemUsecase,
	EditarItemUsecase
} from "@/item/application/usecases/item";
import { PrismaCategoriaRepository, PrismaItemRepository } from "@/item/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { Log } from "@/shared/application/contracts";

export class ItemUsecasesFactory implements ItemUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCadastrarItemUsecase(logger: Log): CadastrarItemUsecase {
		return new CadastrarItemUsecase(logger, this.makeItemRepository(), this.makeCategoriaRepository());
	}

	makeEditarItemUsecase(logger: Log): EditarItemUsecase {
		return new EditarItemUsecase(logger, this.makeItemRepository());
	}

	makeDeletarItemUsecase(logger: Log): DeletarItemUsecase {
		return new DeletarItemUsecase(logger, this.makeItemRepository());
	}

	makeBuscarItemPorCategoriaUsecase(logger: Log): BuscatItemPorCategoriaUsecase {
		return new BuscatItemPorCategoriaUsecase(logger, this.makeItemRepository());
	}

	private makeItemRepository(): PrismaItemRepository {
		return new PrismaItemRepository(this.prismaClient);
	}

	private makeCategoriaRepository(): PrismaCategoriaRepository {
		return new PrismaCategoriaRepository(this.prismaClient);
	}
}
