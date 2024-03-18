import { Customer } from "../entities";

export interface CustomerRepository {
	save(cliente: Customer): Promise<void>;
	findByCpf(cpf: string): Promise<Customer | null>;
}
