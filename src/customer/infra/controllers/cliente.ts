import { CustomerUsecasesFactoryInterface } from "@/customer/application/contracts";
import { CreateCustomerDTO, FindByCpfDTO, createCustomerSchema, findByCpfSchema } from "@/customer/infra/schemas";
import { Log, Validator } from "@/shared/application/contracts";
import { Input, Output } from "@/shared/application/contracts/controller";
import { RestPresenter } from "@/shared/infra/presenters";

export class CustomerController {
	constructor(
		private readonly logger: Log,
		private readonly usecaseFactory: CustomerUsecasesFactoryInterface,
		private readonly validator: Validator
	) {}

	async CreateCustomer(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de cadastro de cliente: ");
			const dto = this.validator.validate<CreateCustomerDTO>(input.body, createCustomerSchema);
			const result = await this.usecaseFactory.makeCreateCustomerUsecase(this.logger).execute(dto);
			return RestPresenter.created(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao cadastrar cliente: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}

	async FindByCPF(input: Input): Promise<Output> {
		try {
			this.logger.info(input, "Nova requisição de busca de cliente por CPF: ");
			const dto = this.validator.validate<FindByCpfDTO>(input.params, findByCpfSchema);
			const result = await this.usecaseFactory.makeFindByCPFUsecase(this.logger).execute(dto);
			return RestPresenter.ok(result.toJson());
		} catch (error) {
			this.logger.error(`Erro ao buscar cliente por CPF: ${error.message}, detalhes: ${error.detail}`);
			return RestPresenter.error(error);
		}
	}
}
