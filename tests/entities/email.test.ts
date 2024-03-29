import { Email } from "@/cliente/domain/value-objects";

describe("Email value object", () => {
	test("Deve criar um Email", () => {
		const email = Email.new("email@provedor.com");

		expect(email).toBeInstanceOf(Email);
		expect(email.getValue()).toBe("email@provedor.com");
	});

	test("Deve criar um Email com valor sanitizado", () => {
		const email = Email.new(" EMAIL@Provedor.com  ");

		expect(email).toBeInstanceOf(Email);
		expect(email.getValue()).toBe("email@provedor.com");
	});

	test.each(["emailprovedor.com", "email@provedor", "email.com", "email"])(
		"Deve lançar exceção ao criar um Email com valor inválido",
		(email) => {
			expect(() => Email.new(email)).toThrow();
		}
	);
});
