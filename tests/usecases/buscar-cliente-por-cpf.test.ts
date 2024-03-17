import { BuscarClientePorCPFUsecase } from "@/cliente/application/usecases";
import { Cliente } from "@/cliente/domain/entities";
import { ClienteRepository } from "@/cliente/domain/repositories";
import { Log } from "@/shared/application/contracts";
import { MockProxy, mock } from "jest-mock-extended";

const validInput = {
	cpf: "12345678901"
};

const clienteJaCadastrado = Cliente.new({
	nome: "Joao",
	email: "joao@email.com",
	cpf: "12345678901"
});

describe("BuscarClientePorCPF Usecase", () => {
	let sut: BuscarClientePorCPFUsecase;
	let clienteRepository: MockProxy<ClienteRepository>;
	let logger: MockProxy<Log>;

	beforeAll(() => {
		clienteRepository = mock();
		logger = mock();
	});

	beforeEach(() => {
		clienteRepository.findByCpf.mockResolvedValue(clienteJaCadastrado);
		clienteRepository.save.mockResolvedValue(undefined);
		sut = new BuscarClientePorCPFUsecase(logger, clienteRepository);
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
