import { Cliente } from "@/cliente/domain/entities";
import { ClienteRepository } from "@/cliente/domain/repositories";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaClienteRepository extends PrismaBaseRepository implements ClienteRepository {
	async save(cliente: Cliente): Promise<void> {
		await this.client.cliente.create({
			data: {
				...cliente.toJson()
			}
		});
	}

	async findByCpf(cpf: string): Promise<Cliente | null> {
		const result = await this.client.cliente.findUnique({
			where: {
				cpf
			}
		});
		return result ? Cliente.restore(result) : null;
	}
}
