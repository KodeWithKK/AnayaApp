import { Injectable, NotFoundException } from "@nestjs/common";
import { and, eq, ilike, inArray, type SQL } from "drizzle-orm";

import { analytics, products, type Database, type GenderType } from "@repo/db";

import { InjectDb } from "../database/database.module";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectDb() private readonly db: Database) {}

  async create(createProductDto: CreateProductDto) {
    const [insertedProduct] = await this.db
      .insert(products)
      .values({
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return insertedProduct;
  }

  async findAll(
    o = 0,
    l = 20,
    category?: string,
    articleType?: string,
    gender?: GenderType,
  ) {
    const conditions: SQL[] = [];
    if (category) conditions.push(eq(analytics.masterCategory, category));
    if (articleType) conditions.push(eq(analytics.articleType, articleType));
    if (gender) conditions.push(eq(analytics.gender, gender));

    let where: SQL | undefined;
    if (conditions.length > 0) {
      const analyticsSubquery = this.db
        .select({ productId: analytics.productId })
        .from(analytics)
        .where(and(...conditions));
      where = inArray(products.id, analyticsSubquery);
    }

    return this.db.query.products.findMany({
      with: {
        brand: { columns: { name: true } },
        analytic: { columns: { productId: false } },
        sizes: { columns: { productId: false } },
        medias: { columns: { productId: false } },
      },
      offset: o,
      limit: l,
      where,
    });
  }

  async search(
    q: string,
    o = 0,
    l = 20,
    category?: string,
    articleType?: string,
  ) {
    const conditions: SQL[] = [];
    if (category) conditions.push(eq(analytics.masterCategory, category));
    if (articleType) conditions.push(eq(analytics.articleType, articleType));

    const whereConditions: SQL[] = [ilike(products.name, `%${q}%`)];

    if (conditions.length > 0) {
      const analyticsSubquery = this.db
        .select({ productId: analytics.productId })
        .from(analytics)
        .where(and(...conditions));
      whereConditions.push(inArray(products.id, analyticsSubquery));
    }

    return this.db.query.products.findMany({
      with: {
        brand: { columns: { name: true } },
        analytic: { columns: { productId: false } },
        sizes: { columns: { productId: false } },
        medias: { columns: { productId: false } },
      },
      offset: o,
      limit: l,
      where: and(...whereConditions),
    });
  }

  async findOne(id: number) {
    const product = await this.db.query.products.findFirst({
      with: {
        sizes: { columns: { productId: false } },
        brand: { columns: { name: true } },
        medias: { columns: { productId: false } },
      },
      where: eq(products.id, id),
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
}
