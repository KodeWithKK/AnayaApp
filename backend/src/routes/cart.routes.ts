import { requireAuth } from "@clerk/express";
import Router from "express";

import {
  addToCart,
  getAllCartItem,
  removeFromCart,
  updateCartQuantity,
} from "../controller/cart.controller";

const router = Router();

router.get("/all", requireAuth(), getAllCartItem);
router.post("/add", requireAuth(), addToCart);
router.put("/update", requireAuth(), updateCartQuantity);
router.delete("/remove", requireAuth(), removeFromCart);

export default router;
