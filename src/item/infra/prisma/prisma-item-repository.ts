import { Categoria, Item } from "@/item/domain/entities";
import { ItemRepository } from "@/item/domain/repositories";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaItemRepository extends PrismaBaseRepository implements ItemRepository {
	async findByCategoria(idCategoria: string): Promise<Item[]> {
		const result = await this.client.item.findMany({
			where: {
				idCategoria
			},
			include: {
				categoria: true
			}
		});
		return result.map((item) => {
			const categoria = Categoria.restore(item.categoria);
			return Item.restore({ ...item, categoria });
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
				categoria: true
			}
		});
		if (!result) return null;
		const categoria = Categoria.restore(result.categoria);
		return Item.restore({ ...result, categoria });
	}

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
