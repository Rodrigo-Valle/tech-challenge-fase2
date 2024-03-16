import { PrismaItemRepository } from "@/item/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { PedidoUsecasesFactoryInterface } from "@/pedido/application/contracts/contracts";
import { CriarPedidoUsecase } from "@/pedido/application/usecases";
import { PrismaPedidoRepository } from "@/pedido/infra/prisma";
import { Log } from "@/shared/contracts";

export class PedidoUsecasesFactory implements PedidoUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCriarPedidoUsecase(logger: Log): CriarPedidoUsecase {
		return new CriarPedidoUsecase(logger, this.makeItemRepository(), this.makePedidoRepository());
	}

	private makeItemRepository(): PrismaItemRepository {
		return new PrismaItemRepository(this.prismaClient);
	}

	private makePedidoRepository(): PrismaPedidoRepository {
		return new PrismaPedidoRepository(this.prismaClient);
	}
}
