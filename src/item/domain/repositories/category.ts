import { Category } from "../entities";

export interface CategoryRepository {
	save(category: Category): Promise<void>;
	findByName(name: string): Promise<Category | null>;
	findById(category: string): Promise<Category | null>;
}
