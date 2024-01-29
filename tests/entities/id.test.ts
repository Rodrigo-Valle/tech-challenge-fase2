import { Id } from "@/1-domain/value-objects";

jest.mock("crypto", () => ({
	randomUUID: () => "random-uuid"
}));

describe("Id value object", () => {
	test("Deve criar um Id", () => {
		const id = Id.new();

		expect(id).toBeInstanceOf(Id);
		expect(id.getValue()).toBe("random-uuid");
	});

	test("Deve rehidratar um Id", () => {
		const id = Id.restore("uuid");

		expect(id).toBeInstanceOf(Id);
		expect(id.getValue()).toBe("uuid");
	});
});
