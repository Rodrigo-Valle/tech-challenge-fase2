import { PrismaClient } from "@prisma/client";

export class PrismaConnection {
	private static instance: PrismaConnection;
	private readonly client: PrismaClient;

	private constructor() {
		this.client = new PrismaClient();
	}

	static getInstance(): PrismaConnection {
		if (!PrismaConnection.instance) {
			PrismaConnection.instance = new PrismaConnection();
		}
		return PrismaConnection.instance;
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}

	async connect(): Promise<void> {
		await this.client.$connect();
	}

	getClient(): PrismaClient {
		return this.client;
	}
}
