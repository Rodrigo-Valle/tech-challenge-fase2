import { validateStringField } from "@/shared/infra/adapters/zod";
import { z } from "zod";

export const buscarItemPorCategoriaSchema = z.object({
	idCategoria: validateStringField({
		fieldName: "idCategoria"
	})
});

export type BuscarItemPorCategoriaDTO = z.infer<typeof buscarItemPorCategoriaSchema>;
