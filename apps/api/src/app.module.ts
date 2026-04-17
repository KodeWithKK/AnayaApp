import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "@thallesp/nestjs-better-auth";

import { createAuth } from "./auth";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { BrandModule } from "./modules/brand/brand.module";
import { CartModule } from "./modules/cart/cart.module";
import { DatabaseModule } from "./modules/database/database.module";
import { MailModule } from "./modules/mail/mail.module";
import { MailService } from "./modules/mail/mail.service";
import { ProductModule } from "./modules/product/product.module";
import { WishlistModule } from "./modules/wishlist/wishlist.module";

@Module({
  imports: [
    AuthModule.forRootAsync({
      imports: [MailModule],
      inject: [MailService],
      useFactory: (mailService: MailService) => ({
        auth: createAuth(mailService),
      }),
    }),
    DatabaseModule,
    ProductModule,
    CartModule,
    BrandModule,
    WishlistModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
