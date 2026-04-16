import { Injectable } from "@nestjs/common";

import { brands, type Database } from "@repo/db";

import { InjectDb } from "../database/database.module";
import { CreateBrandDto } from "./dto/create-brand.dto";

@Injectable()
export class BrandService {
  constructor(@InjectDb() private readonly db: Database) {}

  async create(dto: CreateBrandDto) {
    const [insertedBrand] = await this.db
      .insert(brands)
      .values(dto)
      .returning();
    return insertedBrand;
  }
}
