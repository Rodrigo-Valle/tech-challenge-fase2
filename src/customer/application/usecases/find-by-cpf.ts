import { Customer } from "@/customer/domain/entities/customer";
import { CustomerRepository } from "@/customer/domain/repositories";
import { BaseUsecase, Log, Usecase } from "@/shared/application/contracts";
import { NotFoundError } from "@/shared/domain/exception";

type FindByCPFInput = {
	cpf: string;
};

type FindByCPFOutput = Customer;

export class FindByCPFUsecase extends BaseUsecase implements Usecase<FindByCPFInput, FindByCPFOutput> {
	constructor(
		logger: Log,
		private readonly customerRepository: CustomerRepository
	) {
		super(logger);
	}

	async execute({ cpf }: FindByCPFInput): Promise<FindByCPFOutput> {
		this.logger.info(`Buscando cliente pelo CPF: : ${cpf}`);
		const customer = await this.customerRepository.findByCpf(cpf);
		if (!customer) throw new NotFoundError(`Cliente não encontrado para o CPF: ${cpf}`);
		this.logger.info(customer, "Cliente encontrado, retornando cliente");
		return customer;
	}
}
