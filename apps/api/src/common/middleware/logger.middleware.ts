import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = request;

    if (
      originalUrl.includes("docs/") ||
      originalUrl.includes("favicon.ico") ||
      originalUrl.includes("_next/")
    ) {
      return next();
    }

    this.logger.log(`${method} ${originalUrl} from ${ip}`);

    response.on("finish", () => {
      const { statusCode } = response;
      this.logger.log(`${method} ${originalUrl} ${statusCode}`);
    });

    next();
  }
}
