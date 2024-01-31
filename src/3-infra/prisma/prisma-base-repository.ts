import { type PrismaClient } from "@prisma/client";

export abstract class PrismaBaseRepository {
	readonly client: PrismaClient;

	constructor(client: PrismaClient) {
		this.client = client;
	}
}
