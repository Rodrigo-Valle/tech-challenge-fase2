import { Cliente } from "@/1-domain/entities";

const makeNomeWith256Characters = () => {
	let nome = "";
	for (let i = 0; i < 256; i++) {
		nome += "a";
	}
	return nome;
};

describe("Cliente Teste", () => {
	test("Deve criar um Cliente", () => {
		const cliente = Cliente.new({ nome: "João", email: "joao@email.com", cpf: "12345678901" });

		expect(cliente).toBeInstanceOf(Cliente);
		expect(cliente.getId()).toBeTruthy();
		expect(cliente.getNome()).toBe("João");
		expect(cliente.getEmail()).toBe("joao@email.com");
		expect(cliente.getCpf()).toBe("12345678901");
	});

	test("Deve rehidratar um Cliente", () => {
		const cliente = Cliente.restore({ id: "uuid", nome: "João", email: "joao@email.com", cpf: "12345678901" });

		expect(cliente).toBeInstanceOf(Cliente);
		expect(cliente.getId()).toBe("uuid");
		expect(cliente.getNome()).toBe("João");
		expect(cliente.getEmail()).toBe("joao@email.com");
		expect(cliente.getCpf()).toBe("12345678901");
	});

	test.each(["A", "João 1", makeNomeWith256Characters()])(
		"Deve lançar exceção ao criar um Cliente com nome inválido",
		(nome) => {
			expect(() => Cliente.new({ nome, email: "joao@email.com", cpf: "12345678901" })).toThrow(
				`Nome informado é inválido: ${nome}`
			);
		}
	);

	test("Deve retornar um objeto para persistencia", () => {
		const cliente = Cliente.restore({ id: "uuid", nome: "João", email: "joao@email.com", cpf: "12345678901" });

		expect(cliente.toPersistence()).toEqual({
			id: "uuid",
			nome: "João",
			email: "joao@email.com",
			cpf: "12345678901"
		});
	});
});
