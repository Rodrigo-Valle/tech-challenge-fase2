import { Cliente } from "../entities";

export interface ClienteRepository {
	save(cliente: Cliente): Promise<void>;
	findByCpf(cpf: string): Promise<Cliente | null>;
}
