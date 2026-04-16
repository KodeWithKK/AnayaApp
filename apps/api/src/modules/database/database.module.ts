import { Global, Inject, Module } from "@nestjs/common";

import { connectDb } from "@repo/db";

import { DatabaseService } from "./database.service";

export const DATABASE_CONNECTION = "DATABASE_CONNECTION";

export const InjectDb = () => Inject(DATABASE_CONNECTION);

@Global()
@Module({
  providers: [
    DatabaseService,
    {
      provide: DATABASE_CONNECTION,
      useFactory: () => connectDb(),
    },
  ],
  exports: [DatabaseService, DATABASE_CONNECTION],
})
export class DatabaseModule {}
