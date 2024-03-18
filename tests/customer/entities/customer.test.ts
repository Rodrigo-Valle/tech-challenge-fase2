import { Customer } from "@/customer/domain/entities";

describe("Customer Teste", () => {
	test("Deve criar um Customer", () => {
		const cliente = Customer.new({ name: "João", email: "joao@email.com", cpf: "12345678901" });

		expect(cliente).toBeInstanceOf(Customer);
		expect(cliente.getId()).toBeTruthy();
		expect(cliente.getName()).toBe("João");
		expect(cliente.getEmail()).toBe("joao@email.com");
		expect(cliente.getCpf()).toBe("12345678901");
	});

	test("Deve rehidratar um Customer", () => {
		const cliente = Customer.restore({ id: "uuid", name: "João", email: "joao@email.com", cpf: "12345678901" });

		expect(cliente).toBeInstanceOf(Customer);
		expect(cliente.getId()).toBe("uuid");
		expect(cliente.getName()).toBe("João");
		expect(cliente.getEmail()).toBe("joao@email.com");
		expect(cliente.getCpf()).toBe("12345678901");
	});

	test("Deve retornar um objeto json", () => {
		const cliente = Customer.restore({ id: "uuid", name: "João", email: "joao@email.com", cpf: "12345678901" });

		expect(cliente.toJson()).toEqual({
			id: "uuid",
			name: "João",
			email: "joao@email.com",
			cpf: "12345678901"
		});
	});
});
