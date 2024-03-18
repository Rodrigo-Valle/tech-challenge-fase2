import { CPF } from "@/customer/domain/value-objects";

describe("CPF value object", () => {
	test("Deve criar um CPF", () => {
		const cpf = CPF.new("12345678901");

		expect(cpf).toBeInstanceOf(CPF);
		expect(cpf.getValue()).toBe("12345678901");
	});

	test("Deve criar um CPF com valor sanitizado", () => {
		const cpf = CPF.new("  12345678901  ");

		expect(cpf).toBeInstanceOf(CPF);
		expect(cpf.getValue()).toBe("12345678901");
	});

	test.each(["1234567890", "123456789012", "1B345678901"])(
		"Deve lançar exceção ao criar um CPF com valor inválido",
		(cpf) => {
			expect(() => CPF.new(cpf)).toThrow();
		}
	);
});
