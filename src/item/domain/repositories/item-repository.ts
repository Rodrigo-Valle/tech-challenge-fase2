import { Item } from "../entities";

export interface ItemRepository {
	save(item: Item): Promise<void>;
	update(item: Item): Promise<void>;
	findByNome(nome: string): Promise<Item | null>;
	findById(id: string): Promise<Item | null>;
	findByCategoria(idCategoria: string): Promise<Item[]>;
	delete(id: string): Promise<void>;
}

export type FindParams = {
	includeCategories: boolean;
};
