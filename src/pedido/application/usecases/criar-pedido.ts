import { ItemRepository } from "@/item/domain/repositories";
import { Pedido } from "@/pedido/domain/entities/pedido";
import { PedidoRepository } from "@/pedido/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/contracts";
import { NotFoundError } from "@/shared/exception";

type CriarPedidoInput = {
	clienteId: string | null;
	items: {
		id: string;
		quantidade: number;
	}[];
};

type CriarPedidoOutput = Pedido;

export class CriarPedidoUsecase extends BaseUsecase implements Usecase<CriarPedidoInput, CriarPedidoOutput> {
	constructor(
		logger: Log,
		private readonly itemRepository: ItemRepository,
		private readonly pedidoRepository: PedidoRepository
	) {
		super(logger);
	}

	async execute(input: CriarPedidoInput): Promise<CriarPedidoOutput> {
		this.logger.info({ input }, "Novo pedido recebido");
		const pedido = Pedido.new({ clienteId: input.clienteId });
		for (const item of input.items) {
			const itemFound = await this.itemRepository.findById(item.id);
			if (!itemFound) throw new NotFoundError(`Item com id ${item.id} não encontrado`);
			pedido.adicionarItem(itemFound, item.quantidade);
		}
		pedido.calcularValorTotal();
		await this.pedidoRepository.save(pedido);
		this.logger.info({ pedido }, "Pedido cadastrado com sucesso");
		return pedido;
	}
}
