import { Customer } from "@/customer/domain/entities";
import { CustomerRepository } from "@/customer/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { AlreadyExistsError } from "@/shared/domain/exception";

type CreateCustomerInput = {
	name: string;
	email: string;
	cpf: string;
};

type CreateCustomerOutput = Customer;

export class CreateCustomerUsecase extends BaseUsecase implements Usecase<CreateCustomerInput, CreateCustomerOutput> {
	constructor(
		logger: Log,
		private readonly customerRepository: CustomerRepository
	) {
		super(logger);
	}

	async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
		this.logger.info({ input }, "Novo cadsatro de cliente");
		const customerFound = await this.customerRepository.findByCpf(input.cpf);
		if (customerFound) throw new AlreadyExistsError("Cliente já cadastrado");
		const cliente = Customer.new({ ...input });
		await this.customerRepository.save(cliente);
		this.logger.info({ cliente }, "Cliente cadastrado com sucesso");
		return cliente;
	}
}
