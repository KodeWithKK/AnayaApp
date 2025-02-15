import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import BrandRouter from "./routes/brand.routes";
import DatasetRouter from "./routes/dataset.routes";
import ProductRouter from "./routes/product.routes";
import { ApiResponse } from "./utils/api-response";

const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);

app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/brand", BrandRouter);
app.use("/api/v1/dataset", DatasetRouter);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, {}, "Server is running!"));
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

app.listen(PORT, () => {
  console.log(`HTTP Server started at PORT: ${PORT}`);
});
