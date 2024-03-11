import { CadastrarClienteUsecase } from "@/cliente/application/usecases";
import { Cliente } from "@/cliente/domain/entities";
import { ClienteRepository } from "@/cliente/domain/repositories";
import { Log } from "@/shared/contracts";
import { MockProxy, mock } from "jest-mock-extended";

const invalidInput = {
	nome: "A",
	email: "",
	cpf: "1"
};

const validInput = {
	nome: "Joao",
	email: "joao@email.com",
	cpf: "12345678901"
};

const clienteJaCadastrado = Cliente.new(validInput);

describe("CadastrarCliente Usecase", () => {
	let sut: CadastrarClienteUsecase;
	let clienteRepository: MockProxy<ClienteRepository>;
	let logger: MockProxy<Log>;

	beforeAll(() => {
		clienteRepository = mock();
		logger = mock();
	});

	beforeEach(() => {
		clienteRepository.findByCpf.mockResolvedValue(null);
		clienteRepository.save.mockResolvedValue(undefined);
		sut = new CadastrarClienteUsecase(logger, clienteRepository);
	});

	test("Deve relançar erro se entidade cliente lançar erro", async () => {
		await expect(sut.execute(invalidInput)).rejects.toThrow();
	});

	test("Deve lançar erro se cliente com mesmo CPF já estiver cadastrado", async () => {
		clienteRepository.findByCpf.mockResolvedValueOnce(clienteJaCadastrado);

		await expect(sut.execute(validInput)).rejects.toThrow();
	});

	test("Deve chamar o repositorio de cliente para persistir o cliente", async () => {
		const result = await sut.execute(validInput);

		expect(clienteRepository.save).toHaveBeenCalledTimes(1);
		expect(clienteRepository.save).toHaveBeenCalledWith(result);
	});

	test("Deve retornar um cliente válido", async () => {
		const result = await sut.execute(validInput);

		expect(result.getId()).toBeTruthy();
		expect(result.getCpf()).toEqual(validInput.cpf);
		expect(result.getEmail()).toEqual(validInput.email);
		expect(result.getNome()).toEqual(validInput.nome);
	});
});
