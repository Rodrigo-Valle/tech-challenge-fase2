import { FindByCPFUsecase } from "@/customer/application/usecases";
import { Customer } from "@/customer/domain/entities";
import { CustomerRepository } from "@/customer/domain/repositories";
import { Log } from "@/shared/application/contracts";
import { MockProxy, mock } from "jest-mock-extended";

const validInput = {
	cpf: "12345678901"
};

const clienteJaCadastrado = Customer.new({
	name: "Joao",
	email: "joao@email.com",
	cpf: "12345678901"
});

describe("FindByCPF Usecase", () => {
	let sut: FindByCPFUsecase;
	let clienteRepository: MockProxy<CustomerRepository>;
	let logger: MockProxy<Log>;

	beforeAll(() => {
		clienteRepository = mock();
		logger = mock();
	});

	beforeEach(() => {
		clienteRepository.findByCpf.mockResolvedValue(clienteJaCadastrado);
		clienteRepository.save.mockResolvedValue(undefined);
		sut = new FindByCPFUsecase(logger, clienteRepository);
	});

	test("Deve lançar erro se cliente não for encontrado", async () => {
		clienteRepository.findByCpf.mockResolvedValueOnce(null);

		await expect(sut.execute(validInput)).rejects.toThrow();
	});

	test("Deve retornar um cliente válido", async () => {
		const result = await sut.execute(validInput);

		expect(result).toBeTruthy();
	});
});
