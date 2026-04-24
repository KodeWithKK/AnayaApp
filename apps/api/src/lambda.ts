import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import serverlessExpress from "@vendia/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import express from "express";

import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";

let cachedServer: Handler;

async function bootstrap() {
  console.log("🚀 Lambda starting with Node version:", process.version);
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      { bodyParser: false },
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

    // Swagger setup for Lambda
    const config = new DocumentBuilder()
      .setTitle("Anaya API")
      .setDescription(
        "Comprehensive E-commerce backend API built with NestJS and Better Auth. Provides endpoints for products, cart management, wishlist, and more.",
      )
      .setVersion("1.0")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup("docs", nestApp, document, {
      customCssUrl: [
        "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.32.4/swagger-ui.css",
      ],
      customJs: [
        "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.32.4/swagger-ui-bundle.js",
        "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.32.4/swagger-ui-standalone-preset.js",
      ],
    });

    await nestApp.init();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
