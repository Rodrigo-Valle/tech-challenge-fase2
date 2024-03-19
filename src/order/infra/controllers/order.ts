import { OrderUsecasesFactoryInterface } from "@/order/application/contracts";
import { Input, Log, Output, Validator } from "@/shared/application/contracts";
import { RestPresenter } from "@/shared/infra/presenters";
import { CreateOrderDTO, createOrderSchema } from "../schemas/order";

export class OrderController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: OrderUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async CreateOrder(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de pedido: ");
			const dto = this.validator.validate<CreateOrderDTO>(input.body, createOrderSchema);
			const result = await this.usecaseFactory.makeCreateOrderUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar pedido: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async CreateOrderWithMercadoPagoQrCode(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de pedido com integração MercadoPago QRCode: ");
			const dto = this.validator.validate<CreateOrderDTO>(input.body, createOrderSchema);
			const result = await this.usecaseFactory.makeCreateOrderWithMercadoPagoQrCodeUsecase(this.logger).execute(dto);
			return RestPresenter.created({ ...result.order.toJson(), qrCode: result.qrCode });
		} catch (error) {
			this.logger.error(`Erro ao cadastrar pedido: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async GetOrderOrderedByStatus(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de busca de pedidos ordenados por status: ");
			const result = await this.usecaseFactory.makeGetOrderOrderedByStatusUsecase(this.logger).execute();
			return RestPresenter.created(result.map((order) => order.toJson()));
		} catch (error) {
			this.logger.error(`Erro na busca dos pedidos: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
