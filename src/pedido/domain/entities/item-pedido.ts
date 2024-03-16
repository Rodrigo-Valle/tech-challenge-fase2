import { Item } from "@/item/domain/entities";
import { Id, Preco } from "@/shared/domain/value-objects";
import currency from "currency.js";

export class ItemPedido {
	private id: Id;
	private item: Item;
	private quantidade: number;
	private valorTotal: Preco;

	private constructor(params: ItemPedidoConstructorParams) {
		this.id = params.id;
		this.item = params.item;
		this.quantidade = params.quantidade;
		this.valorTotal = params.valorTotal;
	}

	static calcularValorTotal(preco: string, quantidade: number): string {
		return currency(preco).multiply(quantidade).format({ symbol: "" });
	}

	static new(params: NewItemPedido): ItemPedido {
		return new ItemPedido({
			...params,
			id: Id.new(),
			valorTotal: Preco.new(ItemPedido.calcularValorTotal(params.item.getPreco(), params.quantidade))
		});
	}

	getValorTotal(): string {
		return this.valorTotal.getValue();
	}

	toJson() {
		return {
			id: this.id.getValue(),
			item: this.item.toJson(),
			quantidade: this.quantidade,
			valorTotal: this.valorTotal.getValue()
		};
	}
}

type ItemPedidoConstructorParams = {
	id: Id;
	item: Item;
	quantidade: number;
	valorTotal: Preco;
};

type NewItemPedido = Omit<ItemPedidoConstructorParams, "id" | "valorTotal">;
