import { Email } from "@/1-domain/value-objects";

describe("Email value object", () => {
	test("Deve criar um Email", () => {
		const email = Email.new("email@provedor.com");

		expect(email).toBeInstanceOf(Email);
		expect(email.getValue()).toBe("email@provedor.com");
	});

	test.each(["emailprovedor.com", "email@provedor", "email.com", "email"])(
		"Deve lançar exceção ao criar um Email com valor inválido",
		(email) => {
			expect(() => Email.new(email)).toThrow(`Email informado é inválido: ${email}`);
		}
	);
});
