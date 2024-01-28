import { CadastrarClienteUsecase } from "@/2-application/usecases";

describe("CadastrarCliente Usecase", () => {
	let sut: CadastrarClienteUsecase;

	beforeEach(() => {
		sut = new CadastrarClienteUsecase();
	});

	test("Deve relançar erro se entidade cliente lançar erro", () => {
		expect(() =>
			sut.execute({
				nome: "A",
				email: "",
				cpf: "12345678900"
			})
		).toThrow();
	});
});
