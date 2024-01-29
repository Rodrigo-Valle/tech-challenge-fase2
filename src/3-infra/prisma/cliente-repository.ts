import { ClienteRepository } from "@/1-domain/repositories";
import { PrismaBaseRepository } from "./base.repository";
import { Cliente } from "@/1-domain/entities";

export class PrismaClienteRepository extends PrismaBaseRepository implements ClienteRepository {
	async save(cliente: Cliente): Promise<void> {
		await this.client.cliente.create({
			data: {
				...cliente.toPersistence()
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
