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

    // Diagnostic middleware to track request/response lifecycle
    expressApp.use((req, res, next) => {
      console.log(`[Express] 📥 Incoming: ${req.method} ${req.url}`);
      const start = Date.now();
      const originalEnd = res.end;
      res.end = function (...args: any[]) {
        console.log(
          `[Express] 📤 Finished: ${req.method} ${req.url} - Status: ${
            res.statusCode
          } - Duration: ${Date.now() - start}ms`,
        );
        // @ts-ignore
        return originalEnd.apply(this, args);
      };
      next();
    });

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

export const handler: Handler = async (event, context) => {
  // Prevent Lambda from waiting for the event loop to be empty (needed for DB pools)
  context.callbackWaitsForEmptyEventLoop = false;

  console.log(
    "📥 Incoming Event:",
    JSON.stringify(
      {
        path: event.rawPath || event.path,
        method: event.requestContext?.http?.method || event.httpMethod,
        headers: event.headers,
        requestId: context.awsRequestId,
      },
      null,
      2,
    ),
  );

  const server = await bootstrap();
  try {
    // Calling server without callback to get a Promise back
    // @ts-expect-error: server (Handler) expects 3 arguments, but we pass 2 to return a Promise
    const result = await server(event, context);
    console.log(
      "📤 Lambda Result:",
      JSON.stringify(
        {
          statusCode: result?.statusCode,
          headers: result?.headers,
        },
        null,
        2,
      ),
    );
    return result;
  } catch (error) {
    console.error("❌ Handler Error:", error);
    throw error;
  }
};
