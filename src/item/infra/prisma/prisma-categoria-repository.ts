import { Categoria } from "@/item/domain/entities";
import { CategoriaRepository } from "@/item/domain/repositories";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaCategoriaRepository extends PrismaBaseRepository implements CategoriaRepository {
	async findById(idCategoria: string): Promise<Categoria | null> {
		const result = await this.client.categoria.findUnique({
			where: {
				id: idCategoria
			}
		});
		if (!result) return null;
		return Categoria.restore(result);
	}
}
