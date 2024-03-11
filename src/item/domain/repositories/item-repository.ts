import { Item } from "../entities";

export interface ItemRepository {
	save(item: Item): Promise<void>;
	findByNome(nome: string): Promise<Item | null>;
}
