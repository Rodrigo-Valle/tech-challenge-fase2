import { PrismaItemRepository } from "@/item/infra/prisma";
import { PrismaConnection } from "@/main/drivers";
import { OrderUsecasesFactoryInterface } from "@/order/application/contracts";
import { CreateOrderUsecase, GenerateQrCodeUsecaseDecorator } from "@/order/application/usecases";
import { MercadoPagoPaymentGateway } from "@/order/infra/gateways";
import { PrismaOrderRepository } from "@/order/infra/prisma";
import { Log } from "@/shared/application/contracts";
import { AxiosHttpClientAdapter } from "@/shared/infra/adapters/http-client";

export class OrderUsecasesFactory implements OrderUsecasesFactoryInterface {
	private prismaClient = PrismaConnection.getInstance().getClient();

	makeCreateOrderUsecase(logger: Log): CreateOrderUsecase {
		return new CreateOrderUsecase(logger, this.makeItemRepository(), this.makeOrderRepository());
	}

	makeCreateOrderWithMercadoPagoQrCodeUsecase(logger: Log): GenerateQrCodeUsecaseDecorator {
		const createOrderUsecase = this.makeCreateOrderUsecase(logger);
		const axiosHttpClient = new AxiosHttpClientAdapter();
		const mercadoPagoPaymentGateway = new MercadoPagoPaymentGateway(axiosHttpClient);
		return new GenerateQrCodeUsecaseDecorator(logger, createOrderUsecase, mercadoPagoPaymentGateway);
	}

	private makeItemRepository(): PrismaItemRepository {
		return new PrismaItemRepository(this.prismaClient);
	}

	private makeOrderRepository(): PrismaOrderRepository {
		return new PrismaOrderRepository(this.prismaClient);
	}
}
