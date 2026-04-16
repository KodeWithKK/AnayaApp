import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "@thallesp/nestjs-better-auth";

import { auth } from "./auth";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { BrandModule } from "./modules/brand/brand.module";
import { CartModule } from "./modules/cart/cart.module";
import { DatabaseModule } from "./modules/database/database.module";
import { ProductModule } from "./modules/product/product.module";
import { WishlistModule } from "./modules/wishlist/wishlist.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule.forRoot({
      auth,
    }),
    DatabaseModule,
    ProductModule,
    CartModule,
    BrandModule,
    WishlistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
