import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Anaya API")
  .setDescription(
    "Comprehensive E-commerce backend API built with NestJS and Better Auth. Provides endpoints for products, cart management, wishlist, and more.",
  )
  .setVersion("1.0")
  .setContact("Anaya Support", "https://anaya.com", "support@anaya.com")
  .setLicense("MIT", "https://opensource.org/licenses/MIT")
  .addBearerAuth()
  .addTag("products", "Product discovery and management")
  .addTag("cart", "User shopping cart operations")
  .addTag("wishlist", "Personal user wishlists")
  .addTag("brand", "Product brands and identity")
  .build();
