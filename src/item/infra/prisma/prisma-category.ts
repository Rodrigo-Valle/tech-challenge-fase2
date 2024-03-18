import { Category } from "@/item/domain/entities";
import { CategoryRepository } from "@/item/domain/repositories";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaCategoryRepository extends PrismaBaseRepository implements CategoryRepository {
	async save(category: Category): Promise<void> {
		const categoryData = category.toJson();
		await this.client.category.create({
			data: categoryData
		});
	}

	async findByName(name: string): Promise<Category | null> {
		const result = await this.client.category.findUnique({
			where: {
				name
			}
		});
		if (!result) return null;
		return Category.restore(result);
	}

	async findById(categoryId: string): Promise<Category | null> {
		const result = await this.client.category.findUnique({
			where: {
				id: categoryId
			}
		});
		if (!result) return null;
		return Category.restore(result);
	}
}
