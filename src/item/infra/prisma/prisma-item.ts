import { Category, Item } from "@/item/domain/entities";
import { ItemRepository } from "@/item/domain/repositories";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaItemRepository extends PrismaBaseRepository implements ItemRepository {
	async findByCategory(categoryId: string): Promise<Item[]> {
		const result = await this.client.item.findMany({
			where: {
				categoryId
			},
			include: {
				category: true
			}
		});
		return result.map((item) => {
			const category = Category.restore(item.category);
			return Item.restore({ ...item, category });
		});
	}

	async delete(id: string): Promise<void> {
		await this.client.item.delete({
			where: {
				id
			}
		});
	}

	async update(item: Item): Promise<void> {
		const itemData = item.toPersistence();
		await this.client.item.update({
			where: {
				id: itemData.id
			},
			data: {
				...itemData
			}
		});
	}

	async findById(id: string): Promise<Item | null> {
		const result = await this.client.item.findUnique({
			where: {
				id
			},
			include: {
				category: true
			}
		});
		if (!result) return null;
		const category = Category.restore(result.category);
		return Item.restore({ ...result, category });
	}

	async save(item: Item): Promise<void> {
		const itemData = item.toPersistence();
		await this.client.item.create({
			data: {
				...itemData
			}
		});
	}

	async findByName(name: string): Promise<Item | null> {
		const result = await this.client.item.findUnique({
			where: {
				name
			},
			include: {
				category: true
			}
		});
		if (!result) return null;
		const category = Category.restore(result.category);
		return Item.restore({ ...result, category });
	}
}
