import { Categoria, Item } from "@/item/domain/entities";
import { ItemRepository } from "@/item/domain/repositories";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaItemRepository extends PrismaBaseRepository implements ItemRepository {
	async save(item: Item): Promise<void> {
		const itemData = item.toPersistence();
		await this.client.item.create({
			data: {
				...itemData
			}
		});
	}

	async findByNome(nome: string): Promise<Item | null> {
		const result = await this.client.item.findUnique({
			where: {
				nome
			},
			include: {
				categoria: true
			}
		});
		if (!result) return null;
		const categoria = Categoria.restore(result.categoria);
		return Item.restore({ ...result, categoria });
	}
}
