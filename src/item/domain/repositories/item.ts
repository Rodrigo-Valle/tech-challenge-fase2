import { Item } from "../entities";

export interface ItemRepository {
	save(item: Item): Promise<void>;
	update(item: Item): Promise<void>;
	findByName(name: string): Promise<Item | null>;
	findById(id: string): Promise<Item | null>;
	findByCategory(categoryId: string): Promise<Item[]>;
	delete(id: string): Promise<void>;
}
