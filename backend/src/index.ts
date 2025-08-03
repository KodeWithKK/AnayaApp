import { clerkMiddleware } from "@clerk/express";
import serverlessExpress from "@vendia/serverless-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import BrandRouter from "./routes/brand.routes";
import CartRouter from "./routes/cart.routes";
import DatasetRouter from "./routes/dataset.routes";
import ProductRouter from "./routes/product.routes";
import WebhooksRouter from "./routes/webhooks.routes";
import WishlistRouter from "./routes/wishlist.routes";
import { ApiResponse } from "./utils/api-response";
import { colorizeStatus } from "./utils/morgan-tokens";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(cookieParser());
app.use(clerkMiddleware());

morgan.token("colored-status", (req, res) => colorizeStatus(res.statusCode));
app.use(morgan(":colored-status :method :url :response-time ms"));

app.use(
  cors({
    origin: process.env.FRONTEND_URI || "*",
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);

app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/brand", BrandRouter);
app.use("/api/v1/wishlist", WishlistRouter);
app.use("/api/v1/webhooks", WebhooksRouter);
app.use("/api/v1/cart", CartRouter);
app.use("/api/v1/dataset", DatasetRouter);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, null, "Server is running!"));
});

// Final error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log({ SERVER_ERROR: err });

  if (!res.headersSent) {
    res.status(500).json(
      new ApiResponse(
        500,
        {
          name: process.env.NODE_ENV === "dev" ? (err?.name ?? null) : null,
          message:
            process.env.NODE_ENV === "dev"
              ? (err?.message ?? "Something went wrong")
              : "Something went wrong",
        },
        "Internal Server Error!",
      ),
    );
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === "dev") {
  app.listen(PORT, () => {
    console.log(`HTTP Server started at PORT: ${PORT}`);
  });
}

export const handler = serverlessExpress({ app });
