import { ClienteRepository } from "@/1-domain/repositories";
import { CadastrarClienteUsecase } from "@/2-application/usecases";
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

describe("CadastrarCliente Usecase", () => {
	let sut: CadastrarClienteUsecase;
	let clienteRepository: MockProxy<ClienteRepository>;

	beforeAll(() => {
		clienteRepository = mock();
	});

	beforeEach(() => {
		clienteRepository.save.mockResolvedValue(undefined);
		sut = new CadastrarClienteUsecase(clienteRepository);
	});

	test("Deve relançar erro se entidade cliente lançar erro", () => {
		expect(() => sut.execute(invalidInput)).toThrow();
	});

	test("Deve chamar o repositorio de cliente para persistir o cliente", () => {
		const result = sut.execute(validInput);

		expect(clienteRepository.save).toHaveBeenCalledTimes(1);
		expect(clienteRepository.save).toHaveBeenCalledWith(result);
	});

	test("Deve retornar um cliente válido", () => {
		const result = sut.execute(validInput);

		expect(result.getId()).toBeTruthy();
		expect(result.getCpf()).toEqual(validInput.cpf);
		expect(result.getEmail()).toEqual(validInput.email);
		expect(result.getNome()).toEqual(validInput.nome);
	});
});
