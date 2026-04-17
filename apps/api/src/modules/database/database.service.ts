import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { sql } from "drizzle-orm";

import { connectDb, type Database } from "@repo/db";

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private dbInstance!: Database;

  get db(): Database {
    if (!this.dbInstance) {
      this.dbInstance = connectDb();
    }
    return this.dbInstance;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async $connect() {
    try {
      await this.db.execute(sql`SELECT 1`);
      this.logger.log("Database connection established successfully.");
    } catch (error) {
      this.logger.error("Failed to connect to the database:", error);
      throw error;
    }
  }
}
