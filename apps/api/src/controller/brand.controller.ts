import { Request, Response } from "express";

import { brands, brandsInsertSchema, db } from "@repo/db";

import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export const addBrand = asyncHandler(async (req: Request, res: Response) => {
  const { data, success } = brandsInsertSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid data provided!"));
  }

  const [insertedBrand] = await db.insert(brands).values(data).returning();

  return res.status(200).json(new ApiResponse(200, insertedBrand));
});
