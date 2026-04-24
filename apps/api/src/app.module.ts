import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { AuthModule } from "@thallesp/nestjs-better-auth";

import { auth, setMailService } from "./auth";
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
    AuthModule.forRoot({ auth }),
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
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private readonly mailService: MailService) {}

  onApplicationBootstrap() {
    setMailService(this.mailService);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
