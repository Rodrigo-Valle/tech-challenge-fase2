import { Categoria } from "../entities";

export interface CategoriaRepository {
	findById(categoria: string): Promise<Categoria | null>;
}
