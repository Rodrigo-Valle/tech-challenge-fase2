import { PrismaClient } from "@prisma/client";

export class PrismaConnection {
	private static instance: PrismaConnection;
	private readonly client: PrismaClient;

	private constructor(log?: boolean) {
		this.client = new PrismaClient({
			log: log ? ["query", "info", "warn", "error"] : []
		});
	}

	static getInstance(log?: boolean): PrismaConnection {
		if (!PrismaConnection.instance) {
			PrismaConnection.instance = new PrismaConnection(log);
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
