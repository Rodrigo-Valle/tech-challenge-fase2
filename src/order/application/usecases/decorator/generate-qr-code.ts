import { PaymentGateway } from "@/order/application/contracts";
import { Order } from "@/order/domain/entities/order";
import { Log, Usecase } from "@/shared/application/contracts";
import { HttpClientError, PaymentError } from "@/shared/domain/exception";

type GenerateQrCodeDecoratorOutput = {
	order: Order;
	qrCode: string;
};

export class GenerateQrCodeUsecaseDecorator implements Usecase<unknown, GenerateQrCodeDecoratorOutput> {
	constructor(
		private readonly logger: Log,
		private readonly usecase: Usecase<unknown, Order>,
		private readonly paymentGateway: PaymentGateway
	) {}

	async execute(input: unknown): Promise<GenerateQrCodeDecoratorOutput> {
		const order = await this.usecase.execute(input);
		try {
			this.logger.info(order, "Pedido criado, gerando QRCode no serviço de pagamentos: ");
			const qrCode = await this.paymentGateway.generateQrCode(order);
			const result = { order, qrCode };
			this.logger.info(result, "QRCode gerado com sucesso e adicionado ao pedido: ");
			return result;
		} catch (error) {
			this.logger.error(error, "Erro ao gerar QRCode para pagamento: ");
			if (error instanceof HttpClientError) {
				throw new PaymentError("Não foi possivel gerar QRCode para pagamento");
			}
			throw error;
		}
	}
}
