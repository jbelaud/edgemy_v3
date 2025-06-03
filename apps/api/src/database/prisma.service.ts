import { Injectable, type OnModuleInit, type OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("Connected to the database");
    } catch (error) {
      this.logger.error("Failed to connect to the database", error.stack);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log("Disconnected from the database");
    } catch (error) {
      this.logger.error("Failed to disconnect from the database", error.stack);
    }
  }

  async resetConnection() {
    try {
      await this.$disconnect();
      await this.$connect();
      this.logger.log("Database connection reset successfully");
    } catch (error) {
      this.logger.error("Failed to reset database connection", error.stack);
      throw error;
    }
  }
}