import { Customer } from "@/customer/domain/entities";
import { CustomerRepository } from "@/customer/domain/repositories";
import { PrismaBaseRepository } from "@/shared/infra/prisma";

export class PrismaCustomerRepository extends PrismaBaseRepository implements CustomerRepository {
	async save(customer: Customer): Promise<void> {
		await this.client.customer.create({
			data: {
				...customer.toJson()
			}
		});
	}

	async findByCpf(cpf: string): Promise<Customer | null> {
		const result = await this.client.customer.findUnique({
			where: {
				cpf
			}
		});
		return result ? Customer.restore(result) : null;
	}
}
