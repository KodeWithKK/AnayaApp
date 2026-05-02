import serverlessExpress from "@codegenie/serverless-express";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import express from "express";

import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";

type AsyncHandler = (
  event: APIGatewayProxyEvent,
  context: Context,
) => Promise<APIGatewayProxyResult>;

let serverlessExpressInstance: AsyncHandler | undefined;

async function setup(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  const expressApp = express();
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  nestApp.setGlobalPrefix("api/v1");
  nestApp.useGlobalFilters(new AllExceptionsFilter());
  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const { DocumentBuilder, SwaggerModule } = require("@nestjs/swagger");
  const config = new DocumentBuilder()
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
  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup("docs", nestApp, document);

  nestApp.enableCors();
  await nestApp.init();

  serverlessExpressInstance = serverlessExpress({
    app: expressApp,
  }) as unknown as AsyncHandler;

  return serverlessExpressInstance(event, context);
}

export function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context);
  }

  return setup(event, context);
}
