import { PaymentGateway } from "@/order/application/contracts";
import { Order } from "@/order/domain/entities/order";
import { Log, Usecase } from "@/shared/application/contracts";
import { HttpClientError, PaymentError } from "@/shared/domain/exception";
import { UpdateOrderPaymentStatusUsecase } from "../update-order-payment-status";

type GetPaymentDataOutput = Order;

type GetPaymentDataInput = {
	id: string;
};

export class GetPaymentDataUsecaseDecorator implements Usecase<GetPaymentDataInput, GetPaymentDataOutput> {
	constructor(
		private readonly logger: Log,
		private readonly usecase: UpdateOrderPaymentStatusUsecase,
		private readonly paymentGateway: PaymentGateway
	) {}

	async execute(input: GetPaymentDataInput): Promise<GetPaymentDataOutput> {
		try {
			this.logger.info(input, "Novo evento de pagamento recebido: ");
			const paymentData = await this.paymentGateway.getPaymentData(input.id);
			this.logger.info(paymentData, "Dados de pagamento recuperados: ");
			return await this.usecase.execute({ orderId: paymentData.orderId, statusPagamento: paymentData.paymentStatus });
		} catch (error) {
			this.logger.error(error, "Erro ao buscar dados do pagamento: ");
			if (error instanceof HttpClientError) {
				throw new PaymentError("Não foi possivel recuperar os dados do pagamento");
			}
			throw error;
		}
	}
}
