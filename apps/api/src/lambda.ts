import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Callback, Context, Handler } from "aws-lambda";
import express from "express";

import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    console.log("🚀 Lambda bootstrapping following the article pattern...");

    // Dynamic require for Webpack bundle compatibility
    const serverlessExpressLib = require("@vendia/serverless-express");
    const serverlessExpress =
      serverlessExpressLib.default || serverlessExpressLib;

    const expressLib = require("express");
    const expressApp = (expressLib.default || expressLib)();

    // EXACTLY AS THE ARTICLE: Use ExpressAdapter and default options (including bodyParser)
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    // Defensive check for bundled express instance
    if (expressApp && !("router" in expressApp)) {
      Object.defineProperty(expressApp, "router", {
        get: () => undefined,
        configurable: true,
      });
    }

    expressApp.use((req: any, res: any, next: any) => {
      console.log(`[Express] 📥 Incoming: ${req.method} ${req.url}`);
      next();
    });

    nestApp.setGlobalPrefix("api/v1");
    nestApp.useGlobalFilters(new AllExceptionsFilter());
    nestApp.useGlobalPipes(new ValidationPipe({ transform: true }));

    const config = new DocumentBuilder()
      .setTitle("Anaya API")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup("docs", nestApp, document);

    nestApp.enableCors();

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
  context.callbackWaitsForEmptyEventLoop = false;

  const server = await bootstrap();
  return server(event, context, callback);
};
