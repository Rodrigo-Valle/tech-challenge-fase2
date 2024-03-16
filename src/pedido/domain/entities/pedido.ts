import { Item } from "@/item/domain/entities";
import { Id, Preco } from "@/shared/domain/value-objects";
import currency from "currency.js";
import { StatusPagamento, StatusPedido } from "../value-objects";
import { ItemPedido } from "./item-pedido";

export class Pedido {
	private id: Id;
	private items: ItemPedido[];
	private dataCriacao: Date;
	private statusPagamento: StatusPagamento;
	private statusPedido: StatusPedido;
	private valorTotal: Preco;
	private clienteId: Id | null;

	private constructor(params: PedidoConstructorParams) {
		this.id = params.id;
		this.items = params.items;
		this.dataCriacao = params.dataCriacao;
		this.statusPagamento = params.statusPagamento;
		this.statusPedido = params.statusPedido;
		this.valorTotal = params.valorTotal;
		this.clienteId = params.clienteId;
	}

	static new(params: NewPedidoParams): Pedido {
		return new Pedido({
			id: Id.new(),
			items: [],
			valorTotal: Preco.new(0),
			statusPagamento: StatusPagamento.new("PENDENTE"),
			statusPedido: StatusPedido.new("RECEBIDO"),
			dataCriacao: new Date(),
			clienteId: params.clienteId ? Id.restore(params.clienteId) : null
		});
	}

	static restore(params: PedidoConstructorParams): Pedido {
		return new Pedido(params);
	}

	adicionarItem(item: Item, quantidade: number) {
		const itemPedido = ItemPedido.new({ item, quantidade });
		this.items.push(itemPedido);
	}

	getId(): string {
		return this.id.getValue();
	}

	calcularValorTotal() {
		const valorTotal = this.items.reduce((acc, item) => {
			const valorTotalItem = item.getValorTotal();
			return acc.add(valorTotalItem);
		}, currency("0"));
		this.valorTotal = Preco.new(valorTotal.format({ symbol: "" }));
	}

	toJson() {
		return {
			id: this.id.getValue(),
			items: this.items.map((item) => item.toJson()),
			dataCriacao: this.dataCriacao,
			statusPagamento: this.statusPagamento.toJson(),
			statusPedido: this.statusPedido.toJson(),
			valorTotal: this.valorTotal.getValue(),
			clienteId: this.clienteId?.getValue() ?? null
		};
	}
}

type PedidoConstructorParams = {
	id: Id;
	items: ItemPedido[];
	dataCriacao: Date;
	statusPagamento: StatusPagamento;
	statusPedido: StatusPedido;
	valorTotal: Preco;
	clienteId: Id | null;
};

type NewPedidoParams = {
	clienteId: string | null;
};
