import { CategoryUsecasesFactoryInterface } from "@/item/application/contracts";
import { CreateCategoryUsecase } from "@/item/application/usecases/categoria";
import { PrismaCategoryRepository } from "@/item/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { Log } from "@/shared/application/contracts";

export class CategoryUsecasesFactory implements CategoryUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCreateCategoryUsecase(logger: Log): CreateCategoryUsecase {
		return new CreateCategoryUsecase(logger, this.makeCategoryRepository());
	}

	private makeCategoryRepository(): PrismaCategoryRepository {
		return new PrismaCategoryRepository(this.prismaClient);
	}
}
