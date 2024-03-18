import { ItemUsecasesFactoryInterface } from "@/item/application/contracts";
import {
	CreateItemUsecase,
	DeleteItemUsecase,
	EditItemUsecase,
	FindByCategoryUsecase
} from "@/item/application/usecases/item";
import { PrismaCategoryRepository, PrismaItemRepository } from "@/item/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { Log } from "@/shared/application/contracts";

export class ItemUsecasesFactory implements ItemUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCreateItemUsecase(logger: Log): CreateItemUsecase {
		return new CreateItemUsecase(logger, this.makeItemRepository(), this.makeCategoriaRepository());
	}

	makeEditItemUsecase(logger: Log): EditItemUsecase {
		return new EditItemUsecase(logger, this.makeItemRepository());
	}

	makeDeleteItemUsecase(logger: Log): DeleteItemUsecase {
		return new DeleteItemUsecase(logger, this.makeItemRepository());
	}

	makeFindByCategoryUsecase(logger: Log): FindByCategoryUsecase {
		return new FindByCategoryUsecase(logger, this.makeItemRepository());
	}

	private makeItemRepository(): PrismaItemRepository {
		return new PrismaItemRepository(this.prismaClient);
	}

	private makeCategoriaRepository(): PrismaCategoryRepository {
		return new PrismaCategoryRepository(this.prismaClient);
	}
}
