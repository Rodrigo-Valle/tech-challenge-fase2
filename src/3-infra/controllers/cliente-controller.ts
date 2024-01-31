import { Validator } from "@/2-application/contracts";
import { ControllerOutput } from "@/2-application/contracts/controller";
import { CadastrarClienteUsecase } from "@/2-application/usecases";
import { CadastrarClienteDTO, cadastrarClienteSchema } from "@/3-infra/adapters/zod";

export class ClienteController {
	constructor(
		private readonly cadastrarClienteUsecase: CadastrarClienteUsecase,
		private readonly validator: Validator
	) {}

	async cadastrarCliente(input: CadastrarClienteDTO): Promise<ControllerOutput> {
		try {
			this.validator.validate(input, cadastrarClienteSchema);
			const result = await this.cadastrarClienteUsecase.execute(input);
			return {
				success: true,
				data: result
			};
		} catch (error) {
			const message = `Erro ao cadsatrar cliente: ${error.message}`;
			return {
				success: false,
				error: error,
				message
			};
		}
	}
}
