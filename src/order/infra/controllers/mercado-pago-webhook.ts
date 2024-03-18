import { OrderUsecasesFactoryInterface } from "@/order/application/contracts";
import { Input, Log, Output, Validator } from "@/shared/application/contracts";
import { RestPresenter } from "@/shared/infra/presenters";
import { GetPaymentDataDTO, getPaymentDataSchema } from "../schemas/order";

export class MercadoPagoWebHookController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: OrderUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async ReceiveMercadoPagoEvent(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição do webhook do Mercado Pago: ");
			if (input.body.type === "payment") {
				return this.handlePaymentEvent(input);
			}
			this.logger.warn(input, "Evento não reconhecido: ");
			return RestPresenter.ok();
		} catch (error) {
			this.logger.error(`Erro ao receber evento do mercado pago: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	private async handlePaymentEvent(input: Input): Promise<Output> {
		try {
			const dto = this.validator.validate<GetPaymentDataDTO>(input.body.data, getPaymentDataSchema);
			const result = await this.usecaseFactory
				.makeUpdateOrderPaymentStatusFromMercadoPagoUsecase(this.logger)
				.execute(dto);
			this.logger.info(result, "Status de pagamento do pedido alterado com sucesso");
			return RestPresenter.ok(result);
		} catch (error) {
			this.logger.error(
				`Erro ao receber evento de pagamento do mercado pago: ${error.message}, detalhes: ${error.detail}`
			);
			return RestPresenter.error(error);
		}
	}
}
