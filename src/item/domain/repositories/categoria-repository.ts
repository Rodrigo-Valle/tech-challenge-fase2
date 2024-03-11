import { Categoria } from "../entities";

export interface CategoriaRepository {
	save(categoria: Categoria): Promise<void>;
	findByNome(nome: string): Promise<Categoria | null>;
	findById(categoria: string): Promise<Categoria | null>;
}
