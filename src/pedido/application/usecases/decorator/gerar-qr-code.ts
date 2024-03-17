import { PagamentoGateway } from "@/pedido/application/contracts";
import { Pedido } from "@/pedido/domain/entities/pedido";
import { Log, Usecase } from "@/shared/application/contracts";
import { HttpError, PaymentError } from "@/shared/domain/exception";

type GerarQrCodeDecoratorOutput = {
	pedido: Pedido;
	qrCode: string;
};

export class GerarQrCodeUsecaseDecorator implements Usecase<unknown, GerarQrCodeDecoratorOutput> {
	constructor(
		private readonly logger: Log,
		private readonly usecase: Usecase<unknown, Pedido>,
		private readonly paymentGateway: PagamentoGateway
	) {}

	async execute(input: unknown): Promise<GerarQrCodeDecoratorOutput> {
		const pedido = await this.usecase.execute(input);
		try {
			this.logger.info(pedido, "Pedido criado, gerando QRCode no serviço de pagamentos: ");
			const qrCode = await this.paymentGateway.gerarQrCode(pedido);
			const result = { pedido, qrCode };
			this.logger.info(result, "QRCode gerado com sucesso e adicionado ao pedido: ");
			return result;
		} catch (error) {
			this.logger.error(error, "Erro ao gerar QRCode para pagamento: ");
			if (error instanceof HttpError) {
				throw new PaymentError("Não foi possivel gerar QRCode para pagamento");
			}
			throw error;
		}
	}
}
