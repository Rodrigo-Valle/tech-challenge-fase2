import { PrismaItemRepository } from "@/item/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { PedidoUsecasesFactoryInterface } from "@/pedido/application/contracts";
import { CriarPedidoUsecase, GerarQrCodeUsecaseDecorator } from "@/pedido/application/usecases";
import { MercadoPagoPagamentoGateway } from "@/pedido/infra/gateways";
import { PrismaPedidoRepository } from "@/pedido/infra/prisma";
import { Log } from "@/shared/application/contracts";
import { AxiosHttpClientAdapter } from "@/shared/infra/adapters/http-client";

export class PedidoUsecasesFactory implements PedidoUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCriarPedidoUsecase(logger: Log): CriarPedidoUsecase {
		return new CriarPedidoUsecase(logger, this.makeItemRepository(), this.makePedidoRepository());
	}

	makeCriarPedidoComMercadoPagoQrCodeUsecase(logger: Log): GerarQrCodeUsecaseDecorator {
		const cirarPedidoUsecase = this.makeCriarPedidoUsecase(logger);
		const axiosHttpClient = new AxiosHttpClientAdapter();
		const mercadoPagoPagamentoGateway = new MercadoPagoPagamentoGateway(axiosHttpClient);
		return new GerarQrCodeUsecaseDecorator(logger, cirarPedidoUsecase, mercadoPagoPagamentoGateway);
	}

	private makeItemRepository(): PrismaItemRepository {
		return new PrismaItemRepository(this.prismaClient);
	}

	private makePedidoRepository(): PrismaPedidoRepository {
		return new PrismaPedidoRepository(this.prismaClient);
	}
}
