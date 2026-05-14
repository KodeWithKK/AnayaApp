import * as fs from "fs";
import * as path from "path";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "../src/app.module";
import { swaggerConfig } from "../src/common/swagger.config";

async function generateSwagger() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const outputPath = path.resolve(process.cwd(), "dist/swagger-spec.json");

  const distDir = path.dirname(outputPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`✅ Swagger specification generated at: ${outputPath}`);

  await app.close();
  process.exit(0);
}

generateSwagger().catch((err) => {
  console.error("❌ Failed to generate swagger spec:", err);
  process.exit(1);
});
